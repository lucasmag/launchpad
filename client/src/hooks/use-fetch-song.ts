import React from "react";
import {SERVER_URL} from "@src/common/config.ts";
import JSZip from "jszip";
import {Howl} from "howler";
import {SongSet} from "@src/common/songs/song.types.ts";
import {SongLoadState} from "@src/common/consts.ts";
import {Songs} from "@src/common/songs";



export function useFetchSong() {
  const [state, setState] = React.useState<SongLoadState>(SongLoadState.INITIALIZING);
  const [error, setError] = React.useState<string | null>(null);
  // const [soundFilesByFilename, setSoundFilesByFilename] = React.useState<Record<SongSet, Record<string, Howl>>>({1: {}, 2: {}, 3: {}, 4: {}});

  async function fetchSongZip(songName: string): Promise<JSZip> {
    setState(SongLoadState.DOWNLOADING);

    const response = await fetch(`${SERVER_URL}/songs/${songName}`).catch(error => {

      if (error.name === TypeError.name) {
        setError('Unable to reach server at the moment. Try again later');
      }

      throw error;
    });

    return await JSZip.loadAsync(response.blob());
  }

  async function createFileByNameMapping(zip: JSZip) {
    setState(SongLoadState.EXTRACTING);

    const fileByName: Record<string, Blob> = {};
    const keys = Object.keys(zip.files);

    const promisses = keys.map(async (key) => {
      fileByName[key] = await zip.files[key].async('blob')
    });
    await Promise.all(promisses);

    return fileByName;
  }

  function extractSongSetAndSoundName(filename: string) {
    const regex = /^set(\d+)\/([^/]+)\.mp3$/;
    const  match = filename.match(regex);
    const songSet = match ? match[1] : null;
    const soundName = match ? match[2] : null;

    return {songSet: songSet ? parseInt(songSet) as SongSet : null, soundName};
  }

  function constructAudioTrackMapping(fileByName: Record<string, Blob>) {
    setState(SongLoadState.MAPPING);

    const audioTrackMapping: Record<SongSet, Record<string, Howl>> = {1: {}, 2: {}, 3: {}, 4: {}};
    Object.entries(fileByName).map(([filename, blob]) => {
      const {songSet, soundName} = extractSongSetAndSoundName(filename)
      if (!soundName || !songSet) return;

      const fileURL = URL.createObjectURL(blob);
      audioTrackMapping[songSet][soundName] = new Howl({
        src: [fileURL], format: ['mp3']
      });
    })
    return audioTrackMapping;
  }

  async function fetchSong(songName: string) {
    console.log("Loading song files...");

    const zip = await fetchSongZip(songName);
    const fileByName = await createFileByNameMapping(zip);
    const audioTrackMapping = constructAudioTrackMapping(fileByName);

    const song = Songs[songName];
    song.loadAudioTracks(audioTrackMapping);
    setState(SongLoadState.DONE);

    return song
  }

  return { fetchSong, state, error };
}