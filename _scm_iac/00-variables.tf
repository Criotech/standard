variable "apps_name" {
  type        = string
  description = "Standardize resources naming using apps name passing from manifest.yaml"
}
variable "alternate_domain" {
  type        = map(list(string))
  description = "List of alterate domain name for cloudfront distribution by environment"
  default = {
    "predev" = [
      "predev.app.acuvue.co.in",
      "predev.app.acuvue.co.nz",
      "predev.app.acuvue.co.th",
      "predev.app.acuvue.com.au",
      "predev.app.acuvue.com.hk",
      "predev.app.acuvue.com.my",
      "predev.app.acuvue.com.sg",
      "predev.app.acuvue.com.tw",
    ]
    "dev" = [
      "dev.app.acuvue.co.in",
      "dev.app.acuvue.co.nz",
      "dev.app.acuvue.co.th",
      "dev.app.acuvue.com.au",
      "dev.app.acuvue.com.hk",
      "dev.app.acuvue.com.my",
      "dev.app.acuvue.com.sg",
      "dev.app.acuvue.com.tw",
    ]
    "staging" = [
      "stage.app.acuvue.co.in",
      "stage.app.acuvue.co.nz",
      "stage.app.acuvue.co.th",
      "stage.app.acuvue.com.au",
      "stage.app.acuvue.com.hk",
      "stage.app.acuvue.com.my",
      "stage.app.acuvue.com.sg",
      "stage.app.acuvue.com.tw",
    ]
    "prod" = [
      "app.acuvue.co.in",
      "app.acuvue.co.nz",
      "app.acuvue.co.th",
      "app.acuvue.com.au",
      "app.acuvue.com.hk",
      "app.acuvue.com.my",
      "app.acuvue.com.sg",
      "app.acuvue.com.tw",
    ]
  }
}
variable "cloudfront_function_basic_authentication_arn" {
  type        = string
  description = "A basic authentication on cloudfront function"
  default     = "arn:aws:cloudfront::865798828544:function/myacuvue-th-web-viewer-request-basic-authentication"
}
variable "acm_certificate_arn" {
  type        = string
  description = "value"
  default     = "arn:aws:acm:us-east-1:865798828544:certificate/a5d2bcbe-9bd2-43db-9ebe-9c8121d9dfc3"
}
variable "s3_arn" {
  type    = string
  default = "arn:aws:iam::865798828544:user/project/api/itx-aup-users-s3api-1BISYFTB7DXOG"
}