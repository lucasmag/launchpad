import {Howl} from "howler";

export abstract class Song {
  name: string
  filename: string
  mapping: Record<number, string[]>
  audioTrackMapping: Record<number, Howl[]>

  private songsSource = '/src/assets/songs/';

  constructor() {
    this.audioTrackMapping = {}
    if (new.target === Song) {
      throw new Error("Cannot construct Song instances directly!");
    }
  }

  loadAudioTracks() {
    Object.entries(this.mapping).forEach(([key, set]) => {
      this.audioTrackMapping[parseInt(key)] = set.map(setFileName => new Howl(
        {src: `${this.songsSource}/${this.filename}/set${key}/${setFileName}.mp3`}
      ));
    })

    return this.audioTrackMapping;
  }
}