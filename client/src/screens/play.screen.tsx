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
import {LOAD_STATUS} from "@src/common/consts.ts";
import {useFadeInAnimation} from "@src/hooks/use-animation.ts";

export default function Play() {
  const navigate = useNavigate();
  const songName = useSelector((state: RootState) => state.song.name);

  const {song, state, error, songTrackMapping} = useSong(songName as string);
  const {songSet, pressedKeys} = useBindKeyboardSong(songTrackMapping, song);
  const goToSongList = () => navigate('/song-list')
  useFadeInAnimation('.songName', 0.7);

  React.useEffect(() => {
    if (!songName) goToSongList()
  }, []);

  if (state !== 'done') {
    return <div className="font-black text-2xl">{error || LOAD_STATUS[state]}...</div>
  }

  return (
    <div className="flex flex-col gap-20">
      <Button onClick={goToSongList}> Back </Button>
      <h1 className="opacity-0 songName font-black text-2xl">{song?.name}</h1>

      <Keyboard pressedKeys={pressedKeys} />
      <SongSetSelector songSet={songSet} />
    </div>
  )
}