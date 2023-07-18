# Next.js Study

## 環境構築手順
1. docker のコンテナを立てる
   1. compose.yaml で `ports 3000:3000` を記述して、ポートを開けておく
2. アプリのディレクトリで `$ yarn install` を実行して必要なモジュールをインストール
   1. 白紙から Next.js アプリの環境を生成
      1. `$ yarn create next-app app-name(ディレクトリ名)`
      2. プロジェクト作成の設定
         ```
         ✔ Would you like to use TypeScript? … No
         ✔ Would you like to use ESLint? … Yes
         ✔ Would you like to use Tailwind CSS? … Yes
         ✔ Would you like to use `src/` directory? … No
         ✔ Would you like to use App Router? (recommended) … No
         ✔ Would you like to customize the default import alias? … No
         ```
3. サーバーの起動
   1. `$ yarn dev`
4. S3 にアップロードするソースコードの生成
   1. Next.js の設定 - [参考サイト](https://zenn.dev/hamo/articles/0a96c4d27097bd)
      1. next.config.js
         ```diff
         const nextConfig = {
           reactStrictMode: true,
         + trailingSlash: true,
         + images: {
         +  unoptimized: true,
         +  },
         }
         ```
      1. package.json
         ```diff
         "scripts": {
           "dev": "next dev",
         - "build": "next build
         + "build": "next build && next export",
           "start": "next start",
           "lint": "next lint"
         },
         ```
   2. `$ yarn build`
   3. 生成された `app-name/out` ディレクトリ直下のコンテンツを全て S3 にアップロード
   4. 参考サイト (Next.js を S3 + CloudFront にデプロイ)
      1. https://zenn.dev/hamo/articles/0a96c4d27097bd
      2. https://qiita.com/y_inoue15/items/c637dd2e269f7ab50e38
      3. https://developer.feedforce.jp/entry/2020/10/21/111537
