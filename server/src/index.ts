import express from 'express';
import cors from 'cors';
import * as fs from "fs";
import * as path from "path";

const app = express()
const port = 3000

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/songs/:songName', (req: express.Request, res: express.Response) => {
  const songName: string = req.params.songName;
  const filePath = path.join(__dirname, `/songs/${songName}.zip`);
  const readStream = fs.createReadStream(filePath);

  readStream.on('error', (err) => {
    console.log(`Error reading file: ${err}`);
    res.status(500).send(`Error loading song ${songName}`);
  })

  readStream.on('open', () => {
    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', `attachment; filename=${songName}.zip`);
    readStream.pipe(res);
  });
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})