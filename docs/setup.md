# プロジェクトセットアップガイド

このドキュメントは、Eleventy + Vite + Nunjucks を使った静的サイトジェネレーター環境を、新しいプロジェクトで構築するための手順書です。

## 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [必要な環境](#必要な環境)
3. [インストール手順](#インストール手順)
4. [ディレクトリ構成](#ディレクトリ構成)
5. [設定ファイル](#設定ファイル)
6. [開発の始め方](#開発の始め方)
7. [カスタマイズのポイント](#カスタマイズのポイント)

## プロジェクト概要

このプロジェクトは以下の技術スタックで構成されています：

- **静的サイトジェネレーター**: Eleventy 3.x
- **ビルドツール**: Vite 7.x（TypeScript使用のため必須）
- **テンプレートエンジン**: Nunjucks（.njk拡張子で使用）
- **言語**: TypeScript
- **CSSフレームワーク**: Tailwind CSS v4
- **Linter + Formatter**: Biome（Rust製、超高速）
- **テストフレームワーク**: Vitest

### なぜViteが必要か

このプロジェクトでは**TypeScriptを使用**するため、Viteが必須です：

- **TypeScriptのトランスパイル**: `.ts`ファイルを`.js`に変換
- **モジュール管理**: ハンバーガーメニューなど、機能ごとにファイルを分けて管理
- **HMR（ホットリロード）**: コード変更時に自動リロードで開発効率UP
- **本番ビルドの最適化**: ミニファイ、ツリーシェイキング

Swiperなどの重いライブラリは使わない前提で、軽量な構成を維持します。

### Tailwind CSS v4について

このプロジェクトでは**Tailwind CSS v4**を使用します：

- **設定ファイル不要**: `tailwind.config.js`や`postcss.config.js`は基本的に不要
- **シンプルなインポート**: CSSファイルに`@import "tailwindcss";`だけ
- **Vite統合**: `@tailwindcss/vite`プラグインで自動処理
- **高速ビルド**: Rust製エンジンでビルドが高速化

v3からの主な変更点については[Tailwind CSS公式ドキュメント](https://tailwindcss.com)を参照してください。

### Biomeについて

このプロジェクトでは**Biome**を使用します（Prettier + ESLintの代替）：

- **1つのツール**: LintとFormatを統合
- **超高速**: Rust製で爆速（Prettierの約25倍）
- **シンプルな設定**: `biome.json`のみ
- **TypeScriptネイティブ**: プラグイン不要

**主なコマンド**:

```bash
npm run lint        # Lintチェック
npm run lint:fix    # Lint自動修正
npm run format      # コードフォーマット
```

## 必要な環境

### Node.js / npm

- **Node.js**: 24.11.1（推奨）
- **npm**: 11.6.2（推奨）

## インストール手順

### 1. プロジェクトの初期化

```bash
# 新しいプロジェクトディレクトリを作成
mkdir my-new-project
cd my-new-project

# package.json の初期化
npm init -y
```

### 2. 必須パッケージのインストール

#### コア依存関係

```bash
npm install --save-dev @11ty/eleventy
npm install --save-dev @11ty/eleventy-plugin-vite
npm install --save-dev vite
```

#### TypeScript環境

```bash
npm install --save-dev typescript
npm install --save-dev @types/node
```

#### テスト環境

```bash
npm install --save-dev vitest
npm install --save-dev jsdom
npm install --save-dev @testing-library/dom
```

#### コードフォーマット・Lint

```bash
npm install --save-dev @biomejs/biome
```

#### CSSフレームワーク

```bash
npm install --save-dev tailwindcss
npm install --save-dev @tailwindcss/vite
```

### 3. package.json のスクリプト設定

`package.json` に以下のスクリプトを追加：

```json
{
  "scripts": {
    "dev": "eleventy --serve",
    "build": "eleventy",
    "preview": "eleventy --serve",
    "typecheck": "tsc --noEmit",
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write .",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "volta": {
    "node": "24.11.1",
    "npm": "11.6.2"
  }
}
```

## ディレクトリ構成

以下のディレクトリ構成を作成してください：

```
project-root/
├── src/                           # ソースファイル
│   ├── _includes/                 # テンプレートレイアウト
│   │   ├── default.njk           # ベースレイアウト
│   │   └── _partial/             # パーシャルテンプレート
│   │       ├── head.njk          # <head>セクション
│   │       ├── header.njk        # ヘッダー
│   │       └── footer.njk        # フッター
│   ├── assets/                   # Vite管理のアセット
│   │   ├── css/                  # CSS
│   │   │   ├── style.css         # メインCSS
│   │   │   ├── layout/           # レイアウトCSS
│   │   │   ├── components/       # コンポーネントCSS
│   │   │   ├── page/             # ページ固有CSS
│   │   │   └── utilities/        # ユーティリティCSS
│   │   └── js/                   # JavaScript/TypeScript
│   │       ├── main.ts           # JSエントリーポイント
│   │       └── *.test.ts         # ユニットテスト
│   └── index.njk                 # ホームページ
│
├── public/                        # 静的ファイル（画像等）
│   └── media/                     # メディアファイル
│       └── images/                # 画像ファイル配置先
│
├── dist/                          # ビルド出力先（自動生成）
│   ├── assets/                    # CSS/JSの出力先
│   │   ├── *.css                  # Viteが出力
│   │   └── *.js                   # Viteが出力
│   └── media/                     # 画像の出力先
│       └── images/                # public/media/images/ からコピー
│
├── 設定ファイル
│   ├── eleventy.config.js        # Eleventy設定（Tailwind v4プラグイン含む）
│   ├── biome.json                # Biome設定（Lint + Format）
│   ├── tsconfig.json             # TypeScript設定
│   ├── vitest.config.ts          # テスト設定
│   ├── .eleventyignore           # Eleventy除外設定
│   ├── .editorconfig             # エディタ設定
│   └── .gitignore
```

**ポイント**:
- すべてのソースファイルが `src/` 配下にまとまっている
- アセット（CSS/JS）は `src/assets/` で管理
- Eleventy のテンプレートは `src/_includes/` で管理
- Vite が `src/assets/` を処理し、最適化されたファイルを `dist/assets/` に出力
- 画像ファイルは `public/media/images/` に配置し、Viteが `dist/media/images/` にコピー

## 設定ファイル

### eleventy.config.js

Eleventyの設定ファイルを作成：

**注意**:
- `.njk`拡張子はEleventyがデフォルトでサポートしているため、特別な拡張子設定は不要です
- `@11ty/eleventy-plugin-vite` v7.0.0 はデフォルトエクスポートを使用します
- `node:path` プロトコルを使用します（Node.js組み込みモジュールの明示的なインポート）

```javascript
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite';
import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';

export default function (eleventyConfig) {
  // Viteプラグイン統合
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      root: process.cwd(),
      publicDir: 'public', // Vite が public/ を dist/ にコピー
      plugins: [
        tailwindcss(), // Tailwind CSS v4
      ],
      resolve: {
        alias: {
          '/src': resolve(process.cwd(), 'src'),
        },
      },
      build: {
        rollupOptions: {
          input: resolve(process.cwd(), 'src/assets/js/main.ts'),
        },
      },
    },
  });

  // ウォッチ対象
  eleventyConfig.addWatchTarget('src/assets/**/*');
  eleventyConfig.addWatchTarget('src/_includes/**/*.njk');

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      data: '_data',
    },
  };
}
```

### tsconfig.json

TypeScriptの設定ファイル：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@js/*": ["src/assets/js/*"],
      "@styles/*": ["src/assets/css/*"]
    },
    "types": ["vitest/globals", "node"]
  },
  "include": ["src/**/*.ts", "*.config.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### vitest.config.ts

テスト設定ファイル：

**注意**: ESM環境では `__dirname` が使えないため、`process.cwd()` を使用します

```typescript
import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.config.ts'],
    },
  },
  resolve: {
    alias: {
      '@js': resolve(process.cwd(), 'src/assets/js'),
      '@styles': resolve(process.cwd(), 'src/assets/css'),
    },
  },
});
```

### .eleventyignore

Eleventyが無視するファイル：

```
node_modules/
dist/
*.test.ts
*.config.ts
```

### biome.json

Biomeの設定ファイル（Lint + Format統合）：

**注意**:
- Biome v2 以降では `organizeImports` が `assist.actions.source.organizeImports` に変更されました
- `files.ignore` は `files.includes` に変更され、除外パターンは `!` プレフィックスを使用します
- 最新版をインストール後、`npx biome migrate --write` でマイグレーションできます

```json
{
  "$schema": "https://biomejs.dev/schemas/2.3.14/schema.json",
  "assist": {
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "always",
      "trailingCommas": "es5"
    }
  },
  "files": {
    "includes": [
      "**",
      "!**/node_modules",
      "!**/dist",
      "!**/*.config.ts",
      "!**/*.test.ts"
    ]
  }
}
```

### .gitignore

```
node_modules/
dist/
.DS_Store
.env
*.log
```

## 開発の始め方

### 1. Tailwind CSSの初期化

#### src/assets/css/style.css

メインCSSファイルにTailwind v4のインポートを追加：

```css
@import "tailwindcss";

/* カスタムスタイルはここに追加 */
```

**注意**: Tailwind CSS v4 では `@import "tailwindcss";` だけで設定完了です（ダブルクォート使用）

### 2. JavaScriptエントリーポイントの作成

#### src/assets/js/main.ts

CSSをJavaScriptからインポートします：

```typescript
// メインJavaScriptエントリーポイント

// CSS のインポート
import '../css/style.css';

console.log('Hello from main.ts');

// 機能ごとにファイルを分割してインポートする例:
// import { initHamburgerMenu } from './hamburger';
// import { initAccordion } from './accordion';
//
// initHamburgerMenu();
// initAccordion();
```

### 3. 基本的なテンプレートを作成

#### src/\_includes/default.njk

**重要**: Eleventyでは `{{ content | safe }}` を使用してコンテンツを挿入します（Nunjucksのブロック継承ではない）

```njk
<!DOCTYPE html>
<html lang="ja">
  {% include '_partial/head.njk' %}
  <body>
    {% block header_area %}
    {% include '_partial/header.njk' %}
    {% endblock %}

    <main>
      {{ content | safe }}
    </main>

    {% block footer_area %}
    {% include '_partial/footer.njk' %}
    {% endblock %}
  </body>
</html>
```

#### src/\_includes/\_partial/head.njk

**重要**: Viteがビルド時に `/src/assets/js/main.ts` を処理し、CSS/JSタグを自動的に注入します

```njk
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title | default('サイトタイトル') }}</title>

  {# Vite がビルド時に処理する #}
  <script type="module" src="/src/assets/js/main.ts"></script>
</head>
```

#### src/index.njk

```njk
---
layout: default.njk
title: ホームページ
---

<div class="container mx-auto p-8">
  <h1 class="text-4xl font-bold mb-4">Welcome</h1>
  <p class="text-lg">Hello World</p>
</div>
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセス

### 4. ビルド

```bash
npm run build
```

`dist/` ディレクトリに静的ファイルが生成されます。

## カスタマイズのポイント

### JavaScript/TypeScript

- エントリーポイント: `src/assets/js/main.ts`
- 機能ごとにファイルを分割し、mainでインポート
- テストファイル: `*.test.ts`
- **重要**: CSS は JavaScript からインポートします（`import '../css/style.css'`）

**軽量JS実装の例**（ハンバーガーメニュー、アコーディオンなど）：

```typescript
// src/assets/js/main.ts
import '../css/style.css'; // CSS のインポート

import { initHamburgerMenu } from './hamburger';
import { initAccordion } from './accordion';

initHamburgerMenu();
initAccordion();
```

重いライブラリ（Swiper等）は避け、必要最小限のJSで実装することを推奨。

### 画像ファイル

- **`public/media/images/` ディレクトリに配置**
- ビルド時に `dist/media/images/` にコピーされる（Viteが処理）
- HTMLから参照: `/media/images/example.png`
- CSS/JSは `dist/assets/` 配下、画像は `dist/media/images/` 配下に出力される

## トラブルシューティング

### Viteのエイリアスが解決されない

- `eleventy.config.js`、`tsconfig.json`、`vitest.config.ts` で同じエイリアスを設定しているか確認
- 開発サーバーを再起動

### Biomeのスキーマエラーが出る

- Biome v2 以降では設定ファイルの形式が変更されています
- `npx biome migrate --write` を実行して自動マイグレーション

### 画像が表示されない

- 画像ファイルが `public/media/images/` ディレクトリに配置されているか確認
- HTMLからのパスが `/media/images/...` になっているか確認

## 参考リソース

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Biome Documentation](https://biomejs.dev/)
- [Nunjucks Documentation](https://mozilla.github.io/nunjucks/)
- [Vitest Documentation](https://vitest.dev/)
