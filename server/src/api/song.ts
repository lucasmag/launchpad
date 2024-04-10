import express from 'express';
import SongService from '@src/services/song.service';
import { Readable } from 'node:stream';
import logger from '@src/config/logging';

interface SongRequest {
  songName: string;
}

export async function getSong(
  req: express.Request<SongRequest>,
  res: express.Response,
) {
  logger.info('get song call');
  const songName: string = req.params.songName;

  res.set('Content-Type', 'application/zip');
  res.set('Content-Disposition', `attachment; filename=${songName}.zip`);

  const songFileBase64 = await SongService.getSongFile(songName);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=${songName}.zip`,
    },
    body: songFileBase64,
    isBase64Encoded: true,
}

export async function hello(req: express.Request, res: express.Response) {
  logger.info('hello call');
  res.status(200).json({ message: 'Hello world!' });
}
