import React from "react";
import {Song} from "@src/common/songs/song.types.ts";
import {useFetchSong} from "@src/hooks/use-fetch-song.ts";


export function useSong(songName: string | null) {
  const {fetchSong, state, error} = useFetchSong();
  const [song, setSong] = React.useState<Song>();

  React.useEffect(() => {
    if (!songName) {
      setSong(undefined);
      return;
    }

    fetchSong(songName).then((song) => setSong(song));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songName])

  return {
    song,
    state,
    error,
  }
}