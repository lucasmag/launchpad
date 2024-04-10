resource "aws_ecr_repository" "ecr" {
  name                 = local.namespace
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  lifecycle { prevent_destroy = false }
}

output "ecr_uri" {
  value = aws_ecr_repository.ecr.repository_url
}
