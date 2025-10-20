# Frontend Guidelines

> このドキュメントは暫定版です。随時更新してください。

**📖 [← AI Agents ガイドラインに戻る](../AGENTS.md)**

## 1. プロジェクト概要

### 技術スタック
- **Next.js**: 15.5
- **React**: 19.2
- **TypeScript**: strict mode
- **Tailwind CSS**: v4
- **Shadcn UI**: UIコンポーネントライブラリ
- **パッケージマネージャー**: npm（pnpm、Yarn は不使用）

## 2. 作業フロー
- Issue またはチケットに背景・要件・完了条件を明記する。
- 実装前に関連ドキュメント（本ファイル・各コンポーネント仕様・API 仕様）を確認する。
- 実装後は PR を作成し、概要・変更点・テスト結果を記載する。

## 3. コーディング規約

### TypeScript
- strict モードを前提に型安全を維持する
- `any` の使用は避け、適切な型定義を行う

### CSS
- Tailwind ユーティリティを基本とする
- `globals.css` や `variables.css` で定義されたトークンを活用する
- デザイン反映時は Figma MCP から共有されているトークンを優先的に利用し、数値ハードコードは避ける
- 対応する変数が存在しない場合のみ固定値を使用し、その理由をコメントに残す

### コンポーネント
- Shadcn UI ベースの抽象化を尊重し、責務ごとに分割する

### アイコン
- **重要**: `lucide-react` ではなく、`/public/icons/` にあるオリジナルアイコンを使用
- インポート: `import { Icon } from "@/components/ui/icon"`
- 使用例: `<Icon name="search" className="w-4 h-4" />`
- アイコン名は `src/components/ui/icon-definitions.ts` を参照し、`kebab-case` のファイル名と揃える（例: `/public/icons/star-outline.svg` → `<Icon name="star-outline" />`）
- アイコンを追加・更新した場合は `npm run generate:icons` を実行して `icon-definitions.ts` を再生成すること

### 画像・リンク
- `img` タグの代わりに `next/image` を必ず使用する
- `a` タグの代わりに `next/link` を必ず使用する

### 命名規則
- ファイル・ディレクトリともに kebab-case を使用する

### HTML
- タグ構造は必要最小限とし、不要な `div` や `span` を追加しない
- 集客を目的とした SEO 重視のページではセマンティックなタグを厳守する

## 4. デザイン・アクセシビリティ
- Figma / Storybook で確認できる UI 仕様に合わせる。
- アクセシビリティ: semantic HTML、ARIA 属性、フォーカス管理を厳守。
- レスポンシブ: 主要ブレークポイントでの表示を確認し、デザインとの乖離を防ぐ。
- Figma 反映時は `Inspect` タブで背景色・文字色／フォント・角丸・シャドウ・余白・アイコンサイズなど主要プロパティを必ず確認し、実装値と照合する。判断に迷った場合は必ず質問・相談してから進める。

## 5. Storybook / Docs
- 可能な限りコンポーネントごとに Story を用意する。
- Docs タブで背景や注意点を記載し、仕様書として利用する。
- 追加ドキュメントがある場合は `docs/components/<component>.md` にリンクを記載。

## 6. テスト
- 単体テスト: `npm run test`（使用ツールを追記）
- E2E テスト: （ツールと運用を追記）
- 変更箇所に応じてテストケースを追加し、PR に実行結果を添付する。

## 7. チェックリスト（作業者向け）
- [ ] 要件・仕様を確認した
- [ ] UI とアクセシビリティを確認した
- [ ] テストを実行した
- [ ] 変更内容をドキュメント化した
- [ ] 判断に迷った点は関係者に確認した

## 8. トラブルシューティング

### アイコンが表示されない
- `lucide-react` ではなく `@/components/ui/icon` の `Icon` コンポーネントを使用しているか確認
- `<Icon name="..." />` の `name` が `icon-definitions.ts` に存在するか確認（例: `<Icon name="search" />`）
- `/public/icons/` に該当する SVG ファイルが存在するか確認
- アイコンを追加した際に `npm run generate:icons` を実行したか確認

### Lint エラーが出る
- `npm run lint` を実行してエラー内容を確認
- Button の variant は `"primary" | "accent" | "neutral" | "danger"` のみ使用可能
- Badge の variant は `"default"` を使用
- アイコンは `<Icon name="..." />` 形式で使用し、存在しない `name` を指定していないか確認

### ビルドエラーが出る
- `npm install` で依存関係が正しくインストールされているか確認
- TypeScript エラーを解消する
- `next build` でビルドエラーの詳細を確認

### 画像・リンクが正しく動作しない
- `<img>` タグではなく `<Image>` コンポーネント（`next/image`）を使用しているか確認
- `<a>` タグではなく `<Link>` コンポーネント（`next/link`）を使用しているか確認

---
不明点はこのファイルに追記するか、関連ドキュメントへリンクを追加してください。

