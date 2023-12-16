import {Howl} from "howler";

export type SongSet = 1 | 2 | 3 | 4;
export type KeySoundMapping = Record<string, Howl>;

export abstract class Song {
  code: string
  name: string
  filename: string
  mapping: Record<SongSet, string[]>
  linkedKeys: Record<SongSet, number[]>
  audioTrackMapping: Record<SongSet, Howl[]>

  private songsSource = '/src/assets/songs';

  constructor() {
    this.mapping = {} as Record<SongSet, string[]>
    this.linkedKeys = {} as Record<SongSet, number[]>
    this.audioTrackMapping = {} as Record<SongSet, Howl[]>

    if (new.target === Song) {
      throw new Error("Cannot construct Song instances directly!");
    }
  }

  loadAudioTracks() {
    Object.entries(this.mapping).forEach(([key, set]) => {
      this.audioTrackMapping[parseInt(key) as SongSet] = set.map(setFileName => {
        return new Howl(
          {src: `${this.songsSource}/${this.filename}/set${key}/${setFileName}.mp3`}
        )
      });
    })

    return this.audioTrackMapping;
  }
}