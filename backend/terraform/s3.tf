resource "aws_s3_bucket" "sample" {
  bucket = "aufgiesser-sample-bucket-${var.env}"
}

resource "aws_s3_bucket_public_access_block" "example" {
  bucket = aws_s3_bucket.sample.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_object" "object" {
  bucket = aws_s3_bucket.sample.id
  key = "index.html"
  source = "./src/index.html"
  etag = filemd5("./src/index.html")
  content_type = "text/html; charset=utf-8"
  lifecycle {
    ignore_changes = [
      etag
    ]
  }
}

resource "aws_s3_bucket_policy" "policy" {
  bucket = aws_s3_bucket.sample.id
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Test",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::aufgiesser-sample-bucket-${var.env}/*"
      ]
    }
  ]
}
POLICY
}

resource "aws_s3_bucket_website_configuration" "hosting" {
  bucket = aws_s3_bucket.sample.id
  index_document {
    suffix = "index.html"
  }
}