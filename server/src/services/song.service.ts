import AwsService from "@src/services/aws.service";

class SongService {
  async getSongFile(songName: string) {
    return await AwsService.getFileFromS3Bucket('keyjam-songs', `${songName}.zip`);
  }
}

export default new SongService();