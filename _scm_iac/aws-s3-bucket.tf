resource "aws_s3_bucket" "default" {
  bucket = "${var.apps_name}-${local.environment}"
  acl    = "private"
  lifecycle {
    ignore_changes = [logging, tags, versioning, server_side_encryption_configuration, policy]
  }
}

data "aws_iam_policy_document" "default" {
  statement {
    actions = ["s3:GetObject"]
    principals {
      type = "AWS"
      identifiers = [
        aws_cloudfront_origin_access_identity.default.iam_arn
      ]
    }
    resources = [
      "${aws_s3_bucket.default.arn}/*"
    ]
  }
  statement {
    sid = "GrantAccesstoPutAndGetObjectThroughJenkins"
    actions = [
      "s3:PutObject",
      "s3:PutObjectAcl",
      "s3:GetObject",
      "s3:GetObjectAcl",
      "s3:ListBucket"
    ]
    principals {
      type = "AWS"
      identifiers = [
        var.s3_arn
      ]
    }
    resources = [
      aws_s3_bucket.default.arn,
      "${aws_s3_bucket.default.arn}/*"
    ]
  }
}

resource "aws_s3_bucket_policy" "default" {
  bucket = aws_s3_bucket.default.id
  policy = data.aws_iam_policy_document.default.json
}