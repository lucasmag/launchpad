import React from "react";
import "../styles/keyboard.component.css"
import {useSong} from "@src/hooks/use-song.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@src/state/store.ts";
import {useNavigate} from "react-router-dom";
import {useBindKeyboardSong} from "@src/hooks/use-bind-keyboard-song.ts";
import Keyboard from "@src/components/keyboard.component.tsx";
import SongSetSelector from "@src/components/songset-selector.component.tsx";
import Button from "@src/shared/components/button/button.tsx";
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
    <div className="flex flex-col items-center gap-20">
      <div className="w-full flex flex-col items-center gap-10">
        <Button className="self-start border-indigo-500" onClick={back}>
          <div className="flex items-center gap-3">
            <ChevronLeft />
            <span className="mb-0.5">Back</span>
          </div>
        </Button>

        <h1 style={{animationDelay: '200ms'}} className="font-black text-xl opacity-0 animate-fadein">
          {song?.name}
        </h1>
      </div>


      <Keyboard pressedKeys={pressedKeys} />
      <SongSetSelector songSet={songSet} />
    </div>
  )
}