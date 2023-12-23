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

export default function Play() {
  const navigate = useNavigate();
  const songName = useSelector((state: RootState) => state.song.name);

  const {song, state, error, songTrackMapping} = useSong(songName as string);
  const {songSet, pressedKeys} = useBindKeyboardSong(songTrackMapping, song);
  const goToSongList = () => navigate('/song-list')

  React.useEffect(() => {
    if (!songName) goToSongList()
  }, []);

  if (state !== 'done') {
    return <div className="font-black text-2xl">{error || state}...</div>
  }

  return (
    <div className="flex flex-col gap-20">
      <Button onClick={goToSongList}> Back </Button>
      <h1 className="font-black text-2xl">{song?.name}</h1>

      <Keyboard pressedKeys={pressedKeys} />
      <SongSetSelector songSet={songSet} />
    </div>
  )
}