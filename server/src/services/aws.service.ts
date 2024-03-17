import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

class NotFoundError extends Error {
  status: number
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

class AWSService {
  s3Client: S3Client = new S3Client({});

  // async getBucketFiles(bucketName: string) {
  //   try {
  //     const data = await this.s3Client.send(new ListObjectsV2Command({ Bucket: bucketName }));
  //     console.log(`Retrieved S3 files from ${bucketName}.`, data.Contents);
  //
  //   } catch (err) {
  //     console.log(`Error retrieving S3 files from ${bucketName}`, err);
  //   }
  // }

  async getFileFromS3Bucket(bucketName: string, fileName: string) {
    let file;

    try {
      const data = await this.s3Client.send(new GetObjectCommand({ Bucket: bucketName, Key: fileName }));
      file = data.Body;
    } catch (err) {
      console.log(`Error downloading '${fileName}' from S3 bucket '${bucketName}'`, err);
    }

    if (!file) {
      throw new NotFoundError(`${fileName} was not found on bucket ${bucketName}.`);
    }

    return file;
  }
}

export default new AWSService();