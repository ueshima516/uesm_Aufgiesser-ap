terraform {
  backend "s3" {
    key    = "terraform/aufgiesser-terraform.tfstate"
    region = "ap-northeast-1"
  }
}