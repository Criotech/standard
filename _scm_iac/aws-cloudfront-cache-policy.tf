resource "aws_cloudfront_cache_policy" "CachingOptimized" {
  name        = "CachingOptimized-${local.environment}"
  comment     = "Policy with caching optimized"
  min_ttl     = 1
  default_ttl = 86400
  max_ttl     = 31536000
  parameters_in_cache_key_and_forwarded_to_origin {
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "none"
    }
    cookies_config {
      cookie_behavior = "none"
    }
    enable_accept_encoding_brotli = true
    enable_accept_encoding_gzip   = true
  }
}
resource "aws_cloudfront_cache_policy" "CachingDisabled" {
  name        = "CachingDisabled-${local.environment}"
  comment     = "Policy with caching disabled"
  min_ttl     = 0
  default_ttl = 0
  max_ttl     = 0
  parameters_in_cache_key_and_forwarded_to_origin {
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "none"
    }
    cookies_config {
      cookie_behavior = "none"
    }
    enable_accept_encoding_brotli = false
    enable_accept_encoding_gzip   = false
  }
}