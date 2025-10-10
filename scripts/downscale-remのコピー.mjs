#!/usr/bin/env node

import { spawnSync } from 'node:child_process' // Style Dictionary の CLI を同期実行するため
import fs from 'node:fs' // ファイル読み書き用
import path from 'node:path' // パス操作用
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const OUTPUT = path.resolve(__dirname, '../src/app/variables.css') // 生成される CSS のパス

function runStyleDictionary() {
  const result = spawnSync('npx', ['style-dictionary', 'build'], {
    stdio: 'inherit', // Style Dictionary の出力をそのまま表示
    cwd: path.resolve(__dirname, '..'), // プロジェクトルートで実行
    shell: process.platform === 'win32', // Windows 対応のため shell:true
  })

  if (result.status !== 0) {
    throw new Error('style-dictionary build failed') // 失敗時は例外として処理
  }
}

function formatNumber(value) {
  const parsed = Number(value) // 数値に変換

  if (!Number.isFinite(parsed)) {
    return value // 数値でない場合はそのまま返す
  }

  const fixed = parsed.toFixed(6) // 誤差対策で最大6桁に固定
  return fixed.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1') // 末尾の0を除去
}

function shiftRemValues(cssText) {
  return cssText.replace(/(-?\d*\.?\d+)rem/g, (_, raw) => {
    const shifted = Number(raw) / 10 // rem の値を 1/10 に縮小

    if (!Number.isFinite(shifted)) {
      return `${raw}rem` // 数値変換できない場合は元の値を維持
    }

    return `${formatNumber(shifted)}rem` // 整形した rem を返す
  })
}

function postProcessCss() {
  if (!fs.existsSync(OUTPUT)) {
    throw new Error(`CSS file not found: ${OUTPUT}`) // 出力ファイル未生成ならエラー
  }

  const original = fs.readFileSync(OUTPUT, 'utf8') // 生成された CSS を読み込み

  const shifted = shiftRemValues(original) // rem 値を 1/10 に変換

  fs.writeFileSync(OUTPUT, shifted, 'utf8') // 処理後の CSS を保存
}

try {
  runStyleDictionary() // Style Dictionary で tokens を CSS に変換
  postProcessCss() // rem 調整
  console.log('トークンのビルドと rem の縮小が完了しました。') // 正常終了メッセージ
} catch (error) {
  console.error(error.message) // エラーメッセージ表示
  process.exit(1) // 異常終了
}
