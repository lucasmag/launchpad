resource "aws_api_gateway_account" "this" {
  cloudwatch_role_arn = local.api_lambda_role
}

resource "aws_api_gateway_rest_api" "this" {
  name        = local.namespace
  description = "Forwards HTTP(S) requests to the Lambda function."

  lifecycle { prevent_destroy = false }
}

resource "aws_api_gateway_resource" "this" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  parent_id   = aws_api_gateway_rest_api.this.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "child" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.this.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_method" "root" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_rest_api.this.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "child" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  resource_id = aws_api_gateway_method.child.resource_id
  http_method = aws_api_gateway_method.child.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"

  uri = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.aws_region}:${data.aws_caller_identity.current.account_id}:function:${local.project_name}-$${stageVariables.env_name}-api/invocations"
}

resource "aws_api_gateway_integration" "root" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  resource_id = aws_api_gateway_method.root.resource_id
  http_method = aws_api_gateway_method.root.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.aws_region}:${data.aws_caller_identity.current.account_id}:function:${local.project_name}-$${stageVariables.env_name}-api/invocations"
}

####################
# Custom Responses
####################

resource "aws_api_gateway_gateway_response" "timeout" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  status_code   = "504"
  response_type = "INTEGRATION_TIMEOUT"

  response_templates = {
    "text/html"        = file("templates/timeout.html")
    "application/json" = "{\"message\":$context.error.messageString}"
  }

  response_parameters = {
    "gatewayresponse.header.Content-Type" = "'text/html'"
  }
}

resource "aws_api_gateway_gateway_response" "default_error" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  status_code   = null
  response_type = "DEFAULT_5XX"

  response_templates = {
    "text/html"        = file("templates/5xx.html")
    "application/json" = "{\"message\":$context.error.messageString}"
  }

  response_parameters = {
    "gatewayresponse.header.Content-Type" = "'text/html'"
  }
}

resource "aws_api_gateway_method_response" "timeout" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  resource_id = aws_api_gateway_resource.this.id
  http_method = aws_api_gateway_method.root.http_method
  status_code = "504"

  response_parameters = { "method.response.header.Content-Type" = true }
}

resource "aws_api_gateway_method_response" "default_error" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  resource_id = aws_api_gateway_resource.this.id
  http_method = aws_api_gateway_method.root.http_method
  status_code = "500"

  response_parameters = { "method.response.header.Content-Type" = true }
}

resource "aws_api_gateway_method_response" "default_error_502" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  resource_id = aws_api_gateway_resource.this.id
  http_method = aws_api_gateway_method.root.http_method
  status_code = "502"

  response_parameters = { "method.response.header.Content-Type" = true }
}

output "api_gateway_id" {
  value = aws_api_gateway_rest_api.this.id
}

output "api_gateway_name" {
  value = aws_api_gateway_rest_api.this.name
}

output "api_gateway_exec_arn" {
  value = aws_api_gateway_rest_api.this.execution_arn
}

output "api_gateway_resource_id" {
  value = aws_api_gateway_resource.this.id
}
