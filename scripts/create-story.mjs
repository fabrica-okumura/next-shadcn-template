#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import process from "node:process"

import nodePlop from "node-plop"

async function main() {
  const [, , rawComponentPath, ...rest] = process.argv

  if (!rawComponentPath) {
    console.error("使い方: npm run create-story <コンポーネント.tsx>")
    process.exit(1)
  }

  if (rest.length > 0) {
    console.warn("警告: 2つ目以降の引数は無視されます")
  }

  if (!rawComponentPath.endsWith(".tsx")) {
    console.error("エラー: .tsx のコンポーネントファイルを指定してください")
    process.exit(1)
  }

  const projectRoot = process.cwd()
  const resolvedComponentPath = path.resolve(projectRoot, rawComponentPath)

  if (!fs.existsSync(resolvedComponentPath)) {
    console.error(`エラー: コンポーネントファイルが見つかりません -> ${rawComponentPath}`)
    process.exit(1)
  }

  const plop = await nodePlop(path.resolve(projectRoot, "plopfile.mjs"))
  const generator = plop.getGenerator("create-story")

  if (!generator) {
    console.error("エラー: create-story ジェネレータが plopfile.mjs に定義されていません")
    process.exit(1)
  }

  try {
    const { changes, failures } = await generator.runActions({
      componentPath: resolvedComponentPath,
    })

    if (failures.length > 0) {
      failures.forEach((failure) => {
        const failurePath = failure.path ? normalizePath(projectRoot, failure.path) : null
        const messageParts = ["失敗"]
        if (failurePath) messageParts.push(failurePath)
        if (failure.error) messageParts.push(String(failure.error))
        else if (failure.message) messageParts.push(String(failure.message))
        console.error(messageParts.join(": "))
      })
      process.exit(1)
    }

    if (changes.length === 0) {
      console.log("変更はありませんでした")
      return
    }

    changes.forEach((change) => {
      const changePath = change.path ? normalizePath(projectRoot, change.path) : null
      if (changePath) {
        console.log(`生成 or 更新: ${changePath}`)
      } else {
        console.log("生成 or 更新が完了しました")
      }
    })
  } catch (error) {
    console.error("エラー: ストーリー生成中に例外が発生しました")
    console.error(error)
    process.exit(1)
  }
}

function normalizePath(projectRoot, targetPath) {
  const absolutePath = path.isAbsolute(targetPath)
    ? targetPath
    : path.resolve(projectRoot, targetPath)
  return path.relative(projectRoot, absolutePath) || absolutePath
}

main()

