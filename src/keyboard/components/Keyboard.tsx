import React from "react";
import "../styles.css"
import {keyToCodeMapping, KEY_ROWS} from "@src/keyboard/utils.ts";
import {useSong} from "@src/keyboard/hooks/use-song.ts";
import {useSelector} from "react-redux";
import {RootState} from "@src/state/store.ts";
import {useNavigate} from "react-router-dom";
import {useBindKeyboardSong} from "@src/keyboard/hooks/use-bind-keyboard-song.ts";

export default function Keyboard() {
  const navigate = useNavigate();
  const songName = useSelector((state: RootState) => state.song.name);

  const {song, loading, songTrackMapping} = useSong(songName as string);
  const {songSet, pressedKeys} = useBindKeyboardSong(songTrackMapping, song);
  const goToSongList = () => navigate('/song-list')

  React.useEffect(() => {
    if (!songName) goToSongList()
  }, []);

  if (loading) {
    return <div className="font-black text-2xl">Loading song...</div>
  }

  return (
    <div className="flex flex-col gap-20">
      <button onClick={goToSongList}>
        Back
      </button>
      <h1 className="font-black text-2xl">{song?.name}</h1>
      <div className="keyboard">
        {KEY_ROWS.map((row, rowIndex) =>
          <div key={rowIndex} className="keyboard-row">
            {
              row.map((key, columnIndex) =>
                <div
                  key={columnIndex}
                  className={`keyboard-key ${pressedKeys.includes(keyToCodeMapping[key]) ? 'key-pressed' : ''}`}
                >
                  {key}
                </div>
              )
            }
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className={`keyboard-key ${songSet === 2 ? 'current-key-set' : ''}`}>3</div>
        <div className="flex gap-2">
          <div className={`keyboard-key ${songSet === 1 ? 'current-key-set' : ''}`}>1</div>
          <div className={`keyboard-key ${songSet === 3 ? 'current-key-set' : ''}`}>4</div>
          <div className={`keyboard-key ${songSet === 4 ? 'current-key-set' : ''}`}>2</div>
        </div>
      </div>
    </div>
  )
}