variable "aws_region" {
  default     = "us-east-1"
  description = "This is the AWS region. It must be provided, but it can also be sourced from the AWS_DEFAULT_REGION environment variables, or via a shared credentials file if profile is specified."
}

variable "lambda_image_uri" {
  description = "ECR URI for the tagged image to be used on Lambda deployment."
}

variable "stage" {
  description = "Specific stage in which terraform is being applied [values: dev, review, int, beta, prod]"
}

variable "is_review_environment" {
  default     = false
  type        = bool
  description = "Defines if this workspace corresponds to a review environment."
}
