####################
# API
####################

resource "aws_cloudwatch_log_group" "lambda_api" {
  count = var.is_review_environment ? 0 : 1

  name = "/aws/lambda/${local.namespace}-api"

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_cloudwatch_log_group" "lambda_api_review" {
  count = var.is_review_environment ? 1 : 0

  name = "/aws/lambda/${local.namespace}-api"
}

####################
# Crons
####################

resource "aws_cloudwatch_log_group" "lambda_crons" {
  count = var.is_review_environment ? 0 : 1

  name = "/aws/lambda/${local.namespace}-crons"

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_cloudwatch_log_group" "lambda_crons_review" {
  count = var.is_review_environment ? 1 : 0

  name = "/aws/lambda/${local.namespace}-crons"
}
