import React from "react";
import {Song} from "@src/common/songs/song.types.ts";
import {useFetchSong} from "@src/hooks/use-fetch-song.ts";


export function useSong(songName: string) {
  const {fetchSong, state, error} = useFetchSong();
  const [song, setSong] = React.useState<Song>();

  React.useEffect(() => {
    if (!songName) return;

    fetchSong(songName).then((song) => setSong(song)).finally(() => console.log("Song is ready!"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songName])

  return {
    song,
    state,
    error,
  }
}