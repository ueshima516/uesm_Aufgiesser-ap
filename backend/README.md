# バックエンド

## Docker 操作方法
```
# 仮想環境立ち上げ→中に入る
$ cd backend
$ docker compose up -d
$ docker compose exec python bash
```
```
# 作業終了時
## 仮想環境から抜ける
$ exit
## コンテナの削除
$ docker compose down
```