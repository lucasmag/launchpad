import express from 'express';
import SongService from '@src/services/song.service';
import { Readable } from 'node:stream';

interface SongRequest {
  songName: string;
}

export async function getSong(
  req: express.Request<SongRequest>,
  res: express.Response,
) {
  const songName: string = req.params.songName;

  res.set('Content-Type', 'application/zip');
  res.set('Content-Disposition', `attachment; filename=${songName}.zip`);

  const songFile = (await SongService.getSongFile(songName)) as Readable;
  songFile.pipe(res);
}

export async function hello(req: express.Request, res: express.Response) {
  res.send('Hello world!');
}
