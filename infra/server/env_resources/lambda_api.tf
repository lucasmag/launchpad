resource "aws_lambda_function" "api" {
  function_name = "${local.namespace}-api"
  role          = local.api_lambda_role

  package_type = "Image"
  image_uri    = var.lambda_image_uri

  memory_size                    = 512
  reserved_concurrent_executions = local.lambda_reserved_concurrency
  timeout                        = 28

  tracing_config {
    mode = "Active"
  }

  dead_letter_config {
    target_arn = aws_sns_topic.dlq.arn
  }

  vpc_config {
    subnet_ids         = local.private_subnet_ids
    security_group_ids = [data.terraform_remote_state.shared_resources.outputs.lambda_security_group]
  }

  lifecycle {
    prevent_destroy = true
  }

}

resource "aws_lambda_function_event_invoke_config" "api" {
  function_name                = aws_lambda_function.api.function_name
  maximum_event_age_in_seconds = 60
  maximum_retry_attempts       = 0
}


resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${data.terraform_remote_state.shared_resources.outputs.api_gateway_exec_arn}/*/*"

  lifecycle { prevent_destroy = true }
}

####################
# Monitoring
####################

resource "aws_cloudwatch_metric_alarm" "lambda_api_invocations" {
  alarm_name        = "${local.namespace}-lambda-api-invocations"
  alarm_description = "This metric monitors the number of lambda invocations for the API."

  namespace           = "AWS/Lambda"
  metric_name         = "Invocations"
  comparison_operator = "GreaterThanThreshold"
  datapoints_to_alarm = 2
  evaluation_periods  = 3
  threshold           = 5600
  period              = 60
  statistic           = "Sum"
  treat_missing_data  = "notBreaching"

  dimensions = {
    FunctionName = aws_lambda_function.api.function_name
  }

  alarm_actions = [aws_sns_topic.alerts.arn]
}

resource "aws_cloudwatch_metric_alarm" "lambda_api_throttle" {
  alarm_name        = "${local.namespace}-lambda-api-throttle"
  alarm_description = "This metric monitors the number of lambda throttles for the API."

  namespace           = "AWS/Lambda"
  metric_name         = "Throttles"
  comparison_operator = "GreaterThanThreshold"
  datapoints_to_alarm = 1
  evaluation_periods  = 1
  threshold           = 10
  period              = 60
  statistic           = "Sum"
  treat_missing_data  = "notBreaching"

  dimensions = {
    FunctionName = aws_lambda_function.api.function_name
  }

  alarm_actions = [aws_sns_topic.alerts.arn]
}

resource "aws_cloudwatch_metric_alarm" "lambda_api_errors" {
  alarm_name        = "${local.namespace}-lambda-api-errors"
  alarm_description = "This metric monitors the number of lambda errors for the API."

  namespace           = "AWS/Lambda"
  metric_name         = "Errors"
  comparison_operator = "GreaterThanThreshold"
  datapoints_to_alarm = 1
  evaluation_periods  = 1
  threshold           = 1
  period              = 10
  statistic           = "Average"
  treat_missing_data  = "notBreaching"

  dimensions = {
    FunctionName = aws_lambda_function.api.function_name
  }

  alarm_actions = [aws_sns_topic.alerts.arn]
}

resource "aws_cloudwatch_metric_alarm" "lambda_api_duration" {
  alarm_name        = "${local.namespace}-lambda-api-duration"
  alarm_description = "This metric monitors the average lambda duration for the API."

  namespace           = "AWS/Lambda"
  metric_name         = "Duration"
  comparison_operator = "GreaterThanThreshold"
  datapoints_to_alarm = 2
  evaluation_periods  = 3
  threshold           = 5000
  period              = 60
  statistic           = "Average"
  treat_missing_data  = "notBreaching"

  dimensions = {
    FunctionName = aws_lambda_function.api.function_name
  }

  alarm_actions = [aws_sns_topic.alerts.arn]
}
