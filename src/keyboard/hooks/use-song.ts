import {Songs} from "@src/assets/songs";
import React from "react";
import {codeSequence} from "@src/keyboard/utils.ts";
import {Song} from "@src/assets/songs/song.types.ts";

export function useSong(songName: string, set: number) {
  const songTrackMapping: Record<string, Howl> = {}
  const song: Song = Songs[songName];

  React.useEffect(() => {
    console.log(set)
    song.loadAudioTracks();
    console.log(song.audioTrackMapping)

    codeSequence.map((code, index) => {
      songTrackMapping[code] = song.audioTrackMapping[set][index]
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [set, song]);

  return {
    songName: song.name,
    songTrackMapping
  }
}