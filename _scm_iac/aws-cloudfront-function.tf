resource "aws_cloudfront_function" "viewer_response_headers" {
  publish = true
  name    = "${var.apps_name}-${local.environment}-viewer-response-header"
  runtime = "cloudfront-js-1.0"
  comment = "Modify headers to ${var.apps_name} ${local.environment} viewer response"
  code    = file("${path.module}/_scripts/${local.environment}-viewer-response-headers.js")
}
resource "aws_cloudfront_function" "viewer_request_basic_authentication" {
  publish = true
  name    = "${var.apps_name}-${local.environment}-viewer-request-basic-authentication"
  runtime = "cloudfront-js-1.0"
  comment = "Basic authentication on ${var.apps_name} ${local.environment} viewer request"
  code    = templatefile("${path.module}/_scripts/viewer-request-basic-authentication.js", {
    basicAuthHostException = local.config.cloudfront.basicAuthHostException[local.environment]
    basicAuthEncoded = local.config.cloudfront.basicAuthEncoded[local.environment]
  })
}