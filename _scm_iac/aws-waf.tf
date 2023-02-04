# resource "aws_wafv2_web_acl" "default" {
#   name        = "${var.apps_name}-${local.environment}"
#   description = "WAF Web ACL for ${var.apps_name} ${local.environment}"
#   scope       = "CLOUDFRONT"
#   provider    = aws.us-east
#   default_action {
#     allow {}
#   }
#   visibility_config {
#     cloudwatch_metrics_enabled = true
#     metric_name                = "${var.apps_name}-${local.environment}-waf"
#     sampled_requests_enabled   = false
#   }
# }