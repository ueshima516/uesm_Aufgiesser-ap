# React Study

## 環境構築手順
1. docker のコンテナを立てる
   1. compose.yaml で `ports 3000:3000` を記述して、ポートを開けておく
2. アプリのディレクトリで `$ npm install` を実行して必要なモジュールをインストール
   1. 白紙から React サーバーの環境を生成 → `$ npx create-react-app ディレクトリ名`
3. サーバーの起動
   1. `$ npm start`
4. S3 にアップロードするソースコードの生成
   1. `$ npm run build`
   2. 生成された build ディレクトリ直下のコンテンツを全て S3 にアップロード

## ライブラリ
### ルーティング
- router
  - `$ npm install react-router-dom`
### カレンダー
- react-calendar
  - `$ npm install react-calendar`