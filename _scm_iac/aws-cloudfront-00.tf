locals {
  s3_origin_id = "default"
}
resource "aws_cloudfront_origin_access_identity" "default" {
  comment = "${var.apps_name}-${local.environment}"
}
# Old Cloudfront with Web ACL
resource "aws_cloudfront_distribution" "default" {
  enabled             = true
  is_ipv6_enabled     = true
  wait_for_deployment = true
  default_root_object = "index.html"
  aliases             = lookup(var.alternate_domain, local.environment, [])
  # web_acl_id          = aws_wafv2_web_acl.default.arn
  origin {
    domain_name = aws_s3_bucket.default.bucket_regional_domain_name
    origin_id   = local.s3_origin_id
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.default.cloudfront_access_identity_path
    }
  }
  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    cache_policy_id        = aws_cloudfront_cache_policy.CachingOptimized.id
    dynamic "function_association" {
      for_each = contains(["predev", "dev", "staging", "prod"], local.environment) ? [1] : [0]
      content {
        event_type   = "viewer-request"
        function_arn = aws_cloudfront_function.viewer_request_basic_authentication.arn
      }
    }
    function_association {
      event_type   = "viewer-response"
      function_arn = aws_cloudfront_function.viewer_response_headers.arn
    }
  }
  ordered_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    path_pattern           = "index.html"
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    cache_policy_id        = aws_cloudfront_cache_policy.CachingDisabled.id
    dynamic "function_association" {
      for_each = contains(["predev", "dev", "staging", "prod"], local.environment) ? [1] : [0]
      content {
        event_type   = "viewer-request"
        function_arn = aws_cloudfront_function.viewer_request_basic_authentication.arn
      }
    }
    function_association {
      event_type   = "viewer-response"
      function_arn = aws_cloudfront_function.viewer_response_headers.arn
    }
  }
  custom_error_response {
    error_caching_min_ttl = 86400
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }
  custom_error_response {
    error_caching_min_ttl = 86400
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }
  viewer_certificate {
    acm_certificate_arn      = var.acm_certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  lifecycle {
    ignore_changes = [
      web_acl_id
    ]
  }

  depends_on = [
    aws_cloudfront_function.viewer_request_basic_authentication,
    aws_cloudfront_function.viewer_response_headers,
    aws_s3_bucket.default
  ]
}

resource "aws_cloudfront_distribution" "main" {
  enabled             = true
  is_ipv6_enabled     = true
  wait_for_deployment = true
  default_root_object = "index.html"
  aliases             = [] # lookup(var.alternate_domain, local.environment, [])
  origin {
    domain_name = aws_s3_bucket.default.bucket_regional_domain_name
    origin_id   = local.s3_origin_id
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.default.cloudfront_access_identity_path
    }
  }
  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    cache_policy_id        = aws_cloudfront_cache_policy.CachingOptimized.id
    dynamic "function_association" {
      for_each = contains(["predev", "dev", "staging", "prod"], local.environment) ? [1] : [0]
      content {
        event_type   = "viewer-request"
        function_arn = aws_cloudfront_function.viewer_request_basic_authentication.arn
      }
    }
    function_association {
      event_type   = "viewer-response"
      function_arn = aws_cloudfront_function.viewer_response_headers.arn
    }
  }
  ordered_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    path_pattern           = "index.html"
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    cache_policy_id        = aws_cloudfront_cache_policy.CachingDisabled.id
    dynamic "function_association" {
      for_each = contains(["predev", "dev", "staging", "prod"], local.environment) ? [1] : [0]
      content {
        event_type   = "viewer-request"
        function_arn = aws_cloudfront_function.viewer_request_basic_authentication.arn
      }
    }
    function_association {
      event_type   = "viewer-response"
      function_arn = aws_cloudfront_function.viewer_response_headers.arn
    }
  }
  custom_error_response {
    error_caching_min_ttl = 86400
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }
  custom_error_response {
    error_caching_min_ttl = 86400
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }
  viewer_certificate {
    acm_certificate_arn      = var.acm_certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  depends_on = [
    aws_cloudfront_function.viewer_request_basic_authentication,
    aws_cloudfront_function.viewer_response_headers,
    aws_s3_bucket.default
  ]
}

resource "null_resource" "run_invalidation" {
  triggers = {
    always_run = timestamp()
  }
  provisioner "local-exec" {
    command = "aws cloudfront create-invalidation --distribution-id ${aws_cloudfront_distribution.default.id} --paths '/*'"
  }

  provisioner "local-exec" {
    command = "aws cloudfront create-invalidation --distribution-id ${aws_cloudfront_distribution.main.id} --paths '/*'"
  }
}
