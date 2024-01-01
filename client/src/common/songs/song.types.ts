import { Howl } from 'howler';
import { EMPTY_SONG_TRACK_MAPPING, KEY_CODES } from '@src/common/consts.ts';

export type SongSet = 1 | 2 | 3 | 4;
export type KeySoundMapping = Record<string, Howl>;

export abstract class Song {
  abstract code: string;
  abstract name: string;
  abstract mapping: Record<SongSet, string[]>;
  abstract linkedKeys: Record<SongSet, number[]>;
  audioTrackMapping: Record<SongSet, Howl[]>;

  constructor() {
    this.audioTrackMapping = {} as Record<SongSet, Howl[]>;
  }

  loadAudioTracks(soundFilesByFilename: Record<SongSet, Record<string, Howl>>) {
    Object.entries(this.mapping).forEach(([key, set]) => {
      const songSet = parseInt(key) as SongSet;
      this.audioTrackMapping[songSet] = set.map(
        (setFileName) => soundFilesByFilename[songSet][setFileName],
      );
    });

    return this.audioTrackMapping;
  }

  getSongTrackMapping() {
    if (Object.keys(this.audioTrackMapping).length === 0) {
      throw Error('Song audio track mapping is not initialized!');
    }

    const newSongTrackMapping: Record<SongSet, KeySoundMapping> =
      EMPTY_SONG_TRACK_MAPPING;

    KEY_CODES.map((code, index) => {
      newSongTrackMapping[1][code] = this.audioTrackMapping[1][index];
      newSongTrackMapping[2][code] = this.audioTrackMapping[2][index];
      newSongTrackMapping[3][code] = this.audioTrackMapping[3][index];
      newSongTrackMapping[4][code] = this.audioTrackMapping[4][index];
    });

    return newSongTrackMapping;
  }
}
