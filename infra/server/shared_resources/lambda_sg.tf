resource "aws_security_group" "lambda" {
  name        = "${local.namespace}-lambda"
  description = "Security Group for Lambda without inbounds, allowing outbound to everywhere."

  vpc_id = local.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle { prevent_destroy = true }
}

output "lambda_security_group" {
  value = aws_security_group.lambda.id
}