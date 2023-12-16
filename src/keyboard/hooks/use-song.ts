import {Songs} from "@src/assets/songs";
import React from "react";
import {KEY_CODES, EMPTY_SONG_TRACK_MAPPING} from "@src/keyboard/utils.ts";
import {KeySoundMapping, Song, SongSet} from "@src/assets/songs/song.types.ts";


export function useSong(songName: string) {
  const [songTrackMapping, setSongTrackMapping ] = React.useState<Record<SongSet, KeySoundMapping>>(EMPTY_SONG_TRACK_MAPPING)
  const [song, setSong] = React.useState<Song>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (songName) {
      setSong(Songs[songName]);
    }
  }, [songName])

  React.useEffect(() => {
    setLoading(true);
    song?.loadAudioTracks();
    loadSongTrackMapping();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song])


  function loadSongTrackMapping() {
    const newSongTrackMapping: Record<SongSet, KeySoundMapping> = EMPTY_SONG_TRACK_MAPPING

    if (song) {
      KEY_CODES.map((code, index) => {
        newSongTrackMapping[1][code] = song.audioTrackMapping[1][index]
        newSongTrackMapping[2][code] = song.audioTrackMapping[2][index]
        newSongTrackMapping[3][code] = song.audioTrackMapping[3][index]
        newSongTrackMapping[4][code] = song.audioTrackMapping[4][index]
      });
    }

    setSongTrackMapping(newSongTrackMapping);
  }

  return {
    song,
    loading,
    songTrackMapping
  }
}