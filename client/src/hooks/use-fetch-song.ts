import React from "react";
import {SERVER_URL} from "@src/common/config.ts";
import JSZip from "jszip";
import {Howl} from "howler";
import {SongSet} from "@src/common/songs/song.types.ts";
import {LoadState} from "@src/common/consts.ts";



export function useFetchSong(songName: string) {
  const [state, setState] = React.useState<LoadState>(LoadState.INITIALIZING);
  const [error, setError] = React.useState<string | null>(null);
  const [soundFilesByFilename, setSoundFilesByFilename] = React.useState<Record<SongSet, Record<string, Howl>>>({1: {}, 2: {}, 3: {}, 4: {}});

  async function fetchSong(songName: string): Promise<JSZip> {
    setState(LoadState.DOWNLOADING);

    const response = await fetch(`${SERVER_URL}/songs/${songName}`);
    if (!response.ok) {
      setError(await response.text());
      throw new Error('Error fetching file');
    }

    return await JSZip.loadAsync(response.blob());
  }

  async function createFileByNameMapping(zip: JSZip) {
    setState(LoadState.EXTRACTING);

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
    setState(LoadState.MAPPING);

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

  async function prepareSong() {
    const zip = await fetchSong(songName);
    const fileByName = await createFileByNameMapping(zip);
    const audioTrackMapping = constructAudioTrackMapping(fileByName);

    setSoundFilesByFilename(audioTrackMapping);
    setState(LoadState.DONE);
  }

  React.useEffect(() => {
    if (!songName) return;

    console.log("Loading song files...")
    prepareSong();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songName]);

  return { soundFilesByFilename, state, error };
}