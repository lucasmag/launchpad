import {Songs} from "@src/common/songs";
import React from "react";
import {KEY_CODES, EMPTY_SONG_TRACK_MAPPING} from "@src/common/utils.ts";
import {KeySoundMapping, Song, SongSet} from "@src/common/songs/song.types.ts";
import {useFetchSong} from "@src/hooks/use-fetch-song.ts";


export function useSong(songName: string) {
  const {soundFilesByFilename, state, error} = useFetchSong(songName);
  const [songTrackMapping, setSongTrackMapping ] = React.useState<Record<SongSet, KeySoundMapping>>(EMPTY_SONG_TRACK_MAPPING)
  const [song, setSong] = React.useState<Song>();

  React.useEffect(() => {
    if (songName) {
      setSong(Songs[songName]);
    }
  }, [songName])

  React.useEffect(() => {
    const soundFilesReady = Object.values(soundFilesByFilename).every(
      (files) => Object.keys(files).length > 0
    );
    if (!song || !soundFilesReady) return;

    song?.loadAudioTracks(soundFilesByFilename);
    loadSongTrackMapping();

    console.log("Song is ready!")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song, soundFilesByFilename])


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
    state,
    error,
    songTrackMapping
  }
}