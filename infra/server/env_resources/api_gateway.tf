resource "aws_api_gateway_stage" "this" {
  deployment_id        = aws_api_gateway_deployment.this.id
  rest_api_id          = data.terraform_remote_state.shared_resources.outputs.api_gateway_id
  stage_name           = terraform.workspace
  description          = local.namespace
  xray_tracing_enabled = true

  variables = {
    env_name = terraform.workspace
  }
}

resource "aws_api_gateway_method_settings" "all" {
  rest_api_id = data.terraform_remote_state.shared_resources.outputs.api_gateway_id
  stage_name  = aws_api_gateway_stage.this.stage_name
  method_path = "*/*"

  settings {
    metrics_enabled = false
    logging_level   = "ERROR"
  }
}

resource "aws_api_gateway_deployment" "this" {
  rest_api_id = data.terraform_remote_state.shared_resources.outputs.api_gateway_id
}

resource "aws_api_gateway_base_path_mapping" "this" {
  api_id      = data.terraform_remote_state.shared_resources.outputs.api_gateway_id
  domain_name = local.api_gateway_custom_domain
  stage_name  = aws_api_gateway_stage.this.stage_name
}


####################
# Monitoring
####################

resource "aws_cloudwatch_metric_alarm" "api_gateway_response_5xx" {
  alarm_name        = "${local.namespace}-api-gateway-5xx"
  alarm_description = "This metric monitors 5xx responses from a certain API Gateway stage."

  namespace           = "AWS/ApiGateway"
  metric_name         = "5XXError"
  comparison_operator = "GreaterThanThreshold"
  datapoints_to_alarm = 2
  evaluation_periods  = 3
  threshold           = 40
  period              = 60
  statistic           = "Sum"
  treat_missing_data  = "notBreaching"

  dimensions = {
    ApiName = data.terraform_remote_state.shared_resources.outputs.api_gateway_name
    Stage   = aws_api_gateway_stage.this.stage_name
  }

  alarm_actions = [aws_sns_topic.alerts.arn]
}

resource "aws_cloudwatch_metric_alarm" "api_gateway_response_4xx" {
  alarm_name        = "${local.namespace}-api-gateway-4xx"
  alarm_description = "This metric monitors 4xx responses from a certain API Gateway stage."

  namespace           = "AWS/ApiGateway"
  metric_name         = "4XXError"
  comparison_operator = "GreaterThanThreshold"
  datapoints_to_alarm = 2
  evaluation_periods  = 3
  threshold           = 100
  period              = 60
  statistic           = "Sum"
  treat_missing_data  = "notBreaching"

  dimensions = {
    ApiName = data.terraform_remote_state.shared_resources.outputs.api_gateway_name
    Stage   = aws_api_gateway_stage.this.stage_name
  }

  alarm_actions = [aws_sns_topic.alerts.arn]
}
