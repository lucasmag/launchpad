import React from "react";
import "../components/styles.css"
import {useSong} from "@src/hooks/use-song.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@src/state/store.ts";
import {useNavigate} from "react-router-dom";
import {useBindKeyboardSong} from "@src/hooks/use-bind-keyboard-song.ts";
import Keyboard from "@src/components/Keyboard.component";
import SongSetSelector from "@src/components/SongSetSelector.component";
import Button from "@src/shared/components/Button.tsx";
import {SONG_LOAD_STATE} from "@src/common/consts.ts";
import ChevronLeft from "@src/shared/icons/chevron-left.tsx";
import {setName} from "@src/state/songSlice.ts";

export default function Play() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const songName = useSelector((state: RootState) => state.song.currentSongName);
  const {song, state, error} = useSong(songName);
  const {songSet, pressedKeys} = useBindKeyboardSong(song);
  const goToSongList = React.useCallback(() => navigate('/song-list'), [navigate])
  const getDescriptiveState = React.useMemo(() => {
    console.info(SONG_LOAD_STATE[state]);
    return SONG_LOAD_STATE[state];
  }, [state]);

  React.useEffect(() => {
    if (!songName) goToSongList()
  }, [songName, goToSongList]);

  function back() {
    dispatch(setName(null));
    goToSongList();
  }

  if (state !== 'done') {
    return <div className="font-black text-2xl animate-fadein">{error || getDescriptiveState}</div>
  }

  return (
    <div className="flex flex-col gap-20">
      <Button onClick={back}>
        <ChevronLeft />
        <span className="mb-0.5">Back</span>
      </Button>

      <h1 style={{animationDelay: '200ms'}} className="songName font-black text-xl opacity-0 animate-fadein">
        {song?.name}
      </h1>

      <Keyboard pressedKeys={pressedKeys} />
      <SongSetSelector songSet={songSet} />
    </div>
  )
}