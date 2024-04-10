data "aws_iam_policy_document" "sns_key_policy" {
  # Default
  statement {
    sid       = "Enable IAM User Permissions"
    actions   = ["kms:*"]
    resources = ["*"]

    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${local.aws_account_id}:root"]
    }
  }

  # Cloudwatch Alarms
  statement {
    sid = "Allow cloudwatch to use this key"
    actions = [
      "kms:Decrypt",
      "kms:GenerateDataKey",
    ]
    resources = ["*"]

    principals {
      type        = "Service"
      identifiers = ["cloudwatch.amazonaws.com"]
    }
  }
}

resource "aws_kms_key" "sns" {
  description = "Encryption key for SNS topics"
  policy      = data.aws_iam_policy_document.sns_key_policy.json
}

resource "aws_kms_alias" "sns" {
  name          = "alias/${local.namespace}-cmk/sns"
  target_key_id = aws_kms_key.sns.key_id
}

# Outputs

output "kms_sns_key_id" {
  value = aws_kms_key.sns.key_id
}
