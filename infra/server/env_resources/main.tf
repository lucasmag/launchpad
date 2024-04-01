terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "5.41.0"
    }
  }

  backend "s3" {
    key    = "keyjam/shared_resources.tfstate"
    region = "us-east-1"
  }
}

data "terraform_remote_state" "shared_resources" {
  backend = "s3"
  config = {
    bucket = local.state_bucket
    key    = "keyjam/shared_resources.tfstate"
    region = var.aws_region
  }
}

data "aws_caller_identity" "current" {}

provider "aws" {
  region = "us-east-1"
}

locals {
  aws_account_id   = "637423320697"
  aws_account_name = "keyjam"
  state_bucket     = "keyjam-tfstate-file"

  project_name = "keyjam-launchpad"
  namespace      = "${local.project_name}-${terraform.workspace}"

  api_lambda_role                 = "arn:aws:iam::637423320697:role/lambda-role"
  private_subnet_ids              = ["subnet-09cc76caa0f660731", "subnet-0dc7070198cf58044", "subnet-0c4f62c492a5ce42d"]
  vpc_id                          = "vpc-06de21c453a6dfb5a"
  cicd_user_iam_arn               = "arn:aws:iam::637423320697:user/cicd"
  api_gateway_custom_domain       = "keyjam-api.dev.cloudfront.com"
  cloudfront_custom_domain        = "keyjam-statics.dev.cloudfront.com"

  sns_notification_email          = "keyjamlaunchpad@gmail.com"

  # Used on CloudWatch event targets
  default_input_path     = { "detail-type" = "$.detail-type", "resources" = "$.resources", "detail" = "$.detail", "id" = "$.id", "source" = "$.source", "time" = "$.time", "region" = "$.region", "version" = "$.version", "account" = "$.account" }
  default_input_template = "{\"time\":<time>,\"detail-type\":<detail-type>,\"source\":<source>,\"account\":<account>,\"region\":<region>,\"detail\":<detail>,\"version\":<version>,\"resources\":<resources>,\"id\":<id>,\"kwargs\":{}}"

}
