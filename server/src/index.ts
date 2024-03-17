import express from 'express';
import cors from 'cors';
import SongService from "@src/services/song.service";
import {Readable} from "node:stream";
import logger from "@src/config/logging";

const app = express()
const port = 3000

app.use(cors({
  origin: 'http://localhost:5173'
}));

interface SongRequest {
  songName: string
}

app.get('/songs/:songName', async (req: express.Request<SongRequest>, res: express.Response) => {
  const songName: string = req.params.songName;

  res.set('Content-Type', 'application/zip');
  res.set('Content-Disposition', `attachment; filename=${songName}.zip`);

  const songFile = await SongService.getSongFile(songName) as Readable;
  songFile.pipe(res);
})

app.get('/hello', (req: express.Request, res: express.Response) => {
  res.send('Hello world!');
})

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`)
})