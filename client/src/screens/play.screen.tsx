import React from "react";
import "../components/styles.css"
import {useSong} from "@src/hooks/use-song.ts";
import {useSelector} from "react-redux";
import {RootState} from "@src/state/store.ts";
import {useNavigate} from "react-router-dom";
import {useBindKeyboardSong} from "@src/hooks/use-bind-keyboard-song.ts";
import Keyboard from "@src/components/Keyboard.component";
import SongSetSelector from "@src/components/SongSetSelector.component";
import Button from "@src/shared/components/Button.tsx";
import {SONG_LOAD_STATE} from "@src/common/consts.ts";
import {useFadeInAnimation} from "@src/hooks/use-animation.ts";
import ChevronLeft from "@src/shared/icons/chevron-left.tsx";

export default function Play() {
  useFadeInAnimation('.songName', 0.7);
  const navigate = useNavigate();

  const songName = useSelector((state: RootState) => state.song.name);
  const {song, state, error} = useSong(songName as string);
  const {songSet, pressedKeys} = useBindKeyboardSong(song);
  const goToSongList = React.useCallback(() => navigate('/song-list'), [navigate])

  React.useEffect(() => {
    if (!songName) goToSongList()
  }, [songName, goToSongList]);

  if (state !== 'done') {
    return <div className="font-black text-2xl">{error || SONG_LOAD_STATE[state]}...</div>
  }

  return (
    <div className="flex flex-col gap-20">
      <Button onClick={goToSongList}>
        <ChevronLeft />
        <span className="mb-0.5">Back</span>
      </Button>
      <h1 className="opacity-0 songName font-black text-xl">{song?.name}</h1>

      <Keyboard pressedKeys={pressedKeys} />
      <SongSetSelector songSet={songSet} />
    </div>
  )
}