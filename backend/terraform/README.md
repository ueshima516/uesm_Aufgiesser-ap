## terraform init (Terraform 環境の初期化)

terraform -chdir="./backend/terraform" init -backend-config="bucket=aufgiesser-terraform"

## terraform plan (作成されるリソース or 既存のリソースの変更点 の確認)

terraform -chdir="./backend/terraform" plan -var-file="./vars.tfvars"

## terraform apply (リソースの作成 or 既存リソースの変更 を実施)

terraform -chdir="./backend/terraform" apply -var-file="./vars.tfvars"

## terraform destory (リソースの削除 ※基本的にはこのコマンドは使わない)

- terraform -chdir="./backend/terraform" plan -destory -var-file="./vars.tfvars" で削除されるリソースを確認
- terraform -chdir="./backend/terraform" destroy -var-file="./vars.tfvars"
