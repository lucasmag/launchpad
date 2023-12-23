import {Howl} from "howler";

export type SongSet = 1 | 2 | 3 | 4;
export type KeySoundMapping = Record<string, Howl>;

export abstract class Song {
  code: string
  name: string
  mapping: Record<SongSet, string[]>
  linkedKeys: Record<SongSet, number[]>
  audioTrackMapping: Record<SongSet, Howl[]>

  constructor() {
    this.mapping = {} as Record<SongSet, string[]>
    this.linkedKeys = {} as Record<SongSet, number[]>
    this.audioTrackMapping = {} as Record<SongSet, Howl[]>

    if (new.target === Song) {
      throw new Error("Cannot construct Song instances directly!");
    }
  }

  loadAudioTracks(soundFilesByFilename: Record<SongSet, Record<string, Howl>>) {
    Object.entries(this.mapping).forEach(([key, set]) => {
      const songSet = parseInt(key) as SongSet;
      this.audioTrackMapping[songSet] = set.map(
        setFileName => soundFilesByFilename[songSet][setFileName]
      );
    })

    return this.audioTrackMapping;
  }
}