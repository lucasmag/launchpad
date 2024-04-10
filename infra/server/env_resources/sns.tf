resource "aws_sns_topic" "alerts" {
  name              = "${local.namespace}-alerts"
  kms_master_key_id = data.terraform_remote_state.shared_resources.outputs.kms_sns_key_id
}

resource "aws_sns_topic" "dlq" {
  # Dead letter queue
  name              = "${local.namespace}-dlq"
  kms_master_key_id = data.terraform_remote_state.shared_resources.outputs.kms_sns_key_id
}

resource "aws_sns_topic_subscription" "dlq_email" {
  topic_arn = aws_sns_topic.dlq.arn

  count = local.sns_notification_email != "" ? 1 : 0

  protocol = "email"
  endpoint = local.sns_notification_email
}

resource "aws_sns_topic_subscription" "email" {
  topic_arn = aws_sns_topic.alerts.arn

  count = local.sns_notification_email != "" ? 1 : 0

  protocol = "email"
  endpoint = local.sns_notification_email
}
