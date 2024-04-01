# Business Metrics

# Only created in INT, BETA and PROD

resource "aws_cloudwatch_log_metric_filter" "successfully_downloaded_song" {
  count = 1

  name           = "SuccessfullySDownloadedSong"
  pattern        = "{$.event=\"Successfully downloaded\"}"
  log_group_name = aws_cloudwatch_log_group.lambda_api[0].name

  metric_transformation {
    name      = "SuccessfullySDownloaded"
    namespace = "Keyjam-${var.stage}"
    value     = "1"
    default_value = "0"
  }

  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_cloudwatch_log_metric_filter" "song_not_found" {
  count = var.is_review_environment ? 0 : 1

  name           = "SongNotFound"
  pattern        = "{$.event=\"was not found on bucket\"}"
  log_group_name = aws_cloudwatch_log_group.lambda_api[0].name

  metric_transformation {
    name      = "SongNotFound"
    namespace = "Keyjam-${var.stage}"
    value     = "1"
  }

  lifecycle {
    prevent_destroy = false
  }
}
