# njk-project-template

Eleventy + Vite + Nunjucks を使用した静的サイトジェネレーターのテンプレートプロジェクトです。

## 技術スタック

- **[Eleventy (11ty)](https://www.11ty.dev/)** - 静的サイトジェネレーター
- **[Vite](https://vitejs.dev/)** - 高速なビルドツール
- **[Nunjucks](https://mozilla.github.io/nunjucks/)** - テンプレートエンジン
- **[Tailwind CSS v4](https://tailwindcss.com/)** - ユーティリティファーストCSSフレームワーク
- **[TypeScript](https://www.typescriptlang.org/)** - 型安全なJavaScript
- **[Biome](https://biomejs.dev/)** - 高速なリンター・フォーマッター
- **[Vitest](https://vitest.dev/)** - Viteベースのテストフレームワーク
- **[Volta](https://volta.sh/)** - Node.jsバージョン管理ツール

## 必要な環境

- Node.js: 24.11.1 (Voltaで自動管理)
- npm: 11.6.2

Voltaをインストールしている場合、プロジェクトディレクトリに入ると自動的に適切なNode.jsバージョンが使用されます。

## セットアップ

```bash
# 依存パッケージのインストール
npm install
```

## 使い方

### 開発サーバーの起動

```bash
npm run dev
```

ローカル開発サーバーが起動し、ファイルの変更を監視して自動的にブラウザをリロードします。

### ビルド

```bash
npm run build
```

本番用に最適化されたファイルが `dist/` ディレクトリに生成されます。

### プレビュー

```bash
npm run preview
```

ビルドされたサイトをプレビューします（開発サーバーと同じ）。

### コード品質管理

```bash
# 型チェック
npm run typecheck

# リント
npm run lint

# リント＋自動修正
npm run lint:fix

# フォーマット
npm run format
```

### テスト

```bash
# テストの実行
npm test

# テストのウォッチモード
npm run test:watch
```

## プロジェクト構造

```
.
├── src/                    # ソースファイル
│   ├── _includes/          # Nunjucksテンプレート
│   │   ├── _partial/       # パーシャルテンプレート
│   │   │   ├── head.njk    # <head>セクション
│   │   │   ├── header.njk  # ヘッダー
│   │   │   └── footer.njk  # フッター
│   │   └── default.njk     # デフォルトレイアウト
│   ├── assets/             # 静的アセット
│   │   ├── css/            # スタイルシート
│   │   │   └── style.css   # メインCSS（Tailwind）
│   │   └── js/             # JavaScript/TypeScript
│   │       └── main.ts     # エントリーポイント
│   └── index.njk           # トップページ
├── public/                 # 静的ファイル（そのままコピーされる）
│   └── media/              # 画像などのメディアファイル
├── dist/                   # ビルド出力（生成される）
├── eleventy.config.js      # Eleventyの設定
├── biome.json              # Biomeの設定
├── tsconfig.json           # TypeScriptの設定
├── vitest.config.ts        # Vitestの設定
└── package.json            # プロジェクト設定
```

## 設定ファイル

### Eleventy設定 (`eleventy.config.js`)

- Viteプラグインの統合
- Tailwind CSS v4の有効化
- ファイルウォッチャーの設定
- ディレクトリ構造の定義

### Vite設定

Eleventy設定内で以下を設定：
- Tailwind CSS v4プラグイン
- エイリアス設定（`/src`）
- TypeScriptのエントリーポイント

## 開発のポイント

### Nunjucksテンプレート

ページを作成する際は、フロントマターでレイアウトを指定します：

```njk
---
layout: default.njk
title: ページタイトル
---

<div class="container mx-auto">
  <!-- コンテンツ -->
</div>
```

### Tailwind CSS

Tailwind CSS v4を使用しています。ユーティリティクラスを使ってスタイリングを行います。

### TypeScript

JavaScriptファイルはTypeScriptで記述でき、型チェックが可能です。
