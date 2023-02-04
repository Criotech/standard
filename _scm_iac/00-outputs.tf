output "domain_name" {
  value       = aws_cloudfront_distribution.default.domain_name
  description = "Domain name of CloudFront distribution"
}