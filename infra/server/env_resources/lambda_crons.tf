resource "aws_lambda_function" "crons" {
  function_name = "${local.namespace}-crons"
  role          = local.api_lambda_role

  package_type = "Image"
  image_uri    = var.lambda_image_uri

  memory_size                    = 512
  reserved_concurrent_executions = !var.is_review_environment ? 50 : 5
  timeout                        = 900

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

resource "aws_lambda_function_event_invoke_config" "crons" {
  function_name                = aws_lambda_function.crons.function_name
  maximum_event_age_in_seconds = 60
  maximum_retry_attempts       = 0
}

resource "aws_lambda_permission" "cloudwatch" {
  statement_id  = "AllowExecutionFromCloudwatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.crons.function_name
  principal     = "events.amazonaws.com"

  source_arn = "arn:aws:events:us-east-1:${data.aws_caller_identity.current.account_id}:*"
}

resource "aws_cloudwatch_event_rule" "keep_warm" {
  name                = "${local.namespace}-keep-warm"
  description         = "Keeps Lambda (${aws_lambda_function.crons.function_name}) function warmed by pinging it every minute."
  schedule_expression = "rate(1 minute)"
}

resource "aws_cloudwatch_event_target" "keep_warm_target" {
  rule = aws_cloudwatch_event_rule.keep_warm.name
  arn  = aws_lambda_function.crons.arn

  input_transformer {
    input_paths    = local.default_input_path
    input_template = local.default_input_template
  }
}

####################
# Monitoring
####################

resource "aws_cloudwatch_metric_alarm" "lambda_crons_invocations" {
  alarm_name        = "${local.namespace}-lambda-crons-invocations"
  alarm_description = "This metric monitors the number of lambda invocations for the CRONS."

  namespace           = "AWS/Lambda"
  metric_name         = "Invocations"
  comparison_operator = "GreaterThanThreshold"
  datapoints_to_alarm = 1
  evaluation_periods  = 1
  threshold           = 200
  period              = 60
  statistic           = "Sum"
  treat_missing_data  = "notBreaching"

  dimensions = {
    FunctionName = aws_lambda_function.crons.function_name
  }

  alarm_actions = [aws_sns_topic.alerts.arn]
}

resource "aws_cloudwatch_metric_alarm" "lambda_crons_throttle" {
  alarm_name        = "${local.namespace}-lambda-crons-throttle"
  alarm_description = "This metric monitors the number of lambda throttles for the CRONS."

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
    FunctionName = aws_lambda_function.crons.function_name
  }

  alarm_actions = [aws_sns_topic.alerts.arn]
}

resource "aws_cloudwatch_metric_alarm" "lambda_crons_errors" {
  alarm_name        = "${local.namespace}-lambda-crons-errors"
  alarm_description = "This metric monitors the number of lambda errors for the CRONS."

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
    FunctionName = aws_lambda_function.crons.function_name
  }

  alarm_actions = [aws_sns_topic.alerts.arn]
}

resource "aws_cloudwatch_metric_alarm" "lambda_crons_duration" {
  alarm_name        = "${local.namespace}-lambda-crons-duration"
  alarm_description = "This metric monitors the average lambda duration for the CRONS."

  namespace           = "AWS/Lambda"
  metric_name         = "Duration"
  comparison_operator = "GreaterThanThreshold"
  datapoints_to_alarm = 1
  evaluation_periods  = 1
  threshold           = 300000
  period              = 60
  statistic           = "Average"
  treat_missing_data  = "notBreaching"

  dimensions = {
    FunctionName = aws_lambda_function.crons.function_name
  }

  alarm_actions = [aws_sns_topic.alerts.arn]
}
