import { songSet } from './equinox';

export interface SongSet {
  [songPart: string]: string
}

export class Song {
  songName: string
  mapping: Record<string, SongSet> = {
    equinox: songSet
  }
  constructor(songName: string) {
    this.songName = songName;
  }

  getSongSet() {
    return this.mapping[this.songName];
  }
}