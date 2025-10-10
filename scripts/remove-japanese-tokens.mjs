#!/usr/bin/env node

import fs from "node:fs/promises"
import path from "node:path"

const JAPANESE_REGEX = /[\u3040-\u30ff\u31f0-\u31ff\u3400-\u4dbf\u4e00-\u9fff\uff66-\uff9f]/

const toAbsolutePath = (p) => (path.isAbsolute(p) ? p : path.resolve(process.cwd(), p))

const cleanValue = (value) => {
  if (typeof value === "string") {
    if (JAPANESE_REGEX.test(value)) {
      return { removed: 1 }
    }
    return { value, removed: 0 }
  }

  if (Array.isArray(value)) {
    const result = []
    let removed = 0

    for (const item of value) {
      const cleaned = cleanValue(item)
      removed += cleaned.removed
      if (Object.prototype.hasOwnProperty.call(cleaned, "value")) {
        result.push(cleaned.value)
      }
    }

    if (result.length === 0 && removed > 0) {
      return { removed }
    }

    return { value: result, removed }
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value)
    const output = {}
    let removed = 0

    for (const [key, raw] of entries) {
      if (JAPANESE_REGEX.test(key)) {
        removed += 1
        continue
      }

      const cleaned = cleanValue(raw)
      removed += cleaned.removed
      if (Object.prototype.hasOwnProperty.call(cleaned, "value")) {
        output[key] = cleaned.value
      }
    }

    if (Object.keys(output).length === 0 && removed > 0) {
      return { removed }
    }

    return { value: output, removed }
  }

  return { value, removed: 0 }
}

const processFile = async (filePath) => {
  const absolutePath = toAbsolutePath(filePath)
  const originalJson = await fs.readFile(absolutePath, "utf8")
  const parsed = JSON.parse(originalJson)

  const cleaned = cleanValue(parsed)

  if (!Object.prototype.hasOwnProperty.call(cleaned, "value")) {
    await fs.writeFile(absolutePath, "{}\n", "utf8")
    return { removed: cleaned.removed, updated: true }
  }

  const hasChanges = cleaned.removed > 0

  if (hasChanges) {
    const formatted = `${JSON.stringify(cleaned.value, null, 2)}\n`
    await fs.writeFile(absolutePath, formatted, "utf8")
  }

  return { removed: cleaned.removed, updated: hasChanges }
}

const main = async () => {
  const targets = process.argv.slice(2)
  const tokensDir = toAbsolutePath("tokens")

  const files =
    targets.length > 0
      ? targets.map(toAbsolutePath)
      : (await fs.readdir(tokensDir))
          .filter((name) => name.endsWith(".json"))
          .map((name) => path.join(tokensDir, name))

  if (files.length === 0) {
    console.log("処理対象の JSON ファイルが見つかりませんでした。")
    return
  }

  let totalRemoved = 0

  for (const file of files) {
    try {
      const { removed, updated } = await processFile(file)
      totalRemoved += removed
      if (updated) {
        console.log(`${file}: ${removed} 件の日本語トークンを削除しました。`)
      } else {
        console.log(`${file}: 削除対象はありませんでした。`)
      }
    } catch (error) {
      console.error(`${file}: エラーが発生しました -`, error.message)
    }
  }

  console.log(`合計 ${totalRemoved} 件のトークンを削除しました。`)
}

main().catch((error) => {
  console.error("処理中に致命的なエラーが発生しました", error)
  process.exit(1)
})
