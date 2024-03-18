import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import logger from '@src/config/logging';

class NotFoundError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

class AWSService {
  s3Client: S3Client = new S3Client({});

  async getFileFromS3Bucket(bucketName: string, fileName: string) {
    let file;

    try {
      logger.info(
        `Downloading '${fileName}' from S3 bucket '${bucketName}'...`,
      );
      const data = await this.s3Client.send(
        new GetObjectCommand({ Bucket: bucketName, Key: fileName }),
      );
      file = data.Body;
    } catch (err) {
      logger.error(
        `Error downloading '${fileName}' from S3 bucket '${bucketName}'`,
        err,
      );
    }

    if (!file) {
      throw new NotFoundError(
        `${fileName} was not found on bucket ${bucketName}.`,
      );
    }

    logger.info(
      `Successfully downloaded '${fileName}' from S3 bucket '${bucketName}'`,
    );
    return file;
  }
}

export default new AWSService();
