# default aws provider
provider "aws" {
  region  = "ap-southeast-1"
  version = "3.74.0"
}
# us-east aws provider for some global resources like WAF for cloudfront
provider "aws" {
  alias   = "us-east"
  region  = "us-east-1"
  version = "3.74.0"
}