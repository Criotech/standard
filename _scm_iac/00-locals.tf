locals {
  environment = lower(terraform.workspace)
  tags = {
    Applications = var.apps_name
    Environment  = local.environment
  }
  config = {
    cloudfront = {
      basicAuthHostException = {
        predev = []
        dev = []
        staging = []
        prod = ["app.acuvue.co.in", "app.acuvue.com.au", "app.acuvue.com.hk", "app.acuvue.co.th", "app.acuvue.com.tw", "app.acuvue.com.sg", "app.acuvue.com.my", "app.acuvue.co.nz"]
      }
      basicAuthEncoded = {
        # base64encode("username:password")
        predev = "amp1c2VybWF0aDpQYXNzd29yZDEh"
        dev = "amp1c2VybWF0aDpQYXNzd29yZDEh"
        staging = "amp1c2VybWF0aDpQYXNzd29yZDEh"
        prod = "amp1c2VybWF0aDpQYXNzd29yZDEh"
      }
    }
  }
}
