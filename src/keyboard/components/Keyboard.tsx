import React from "react";
import "../styles.css"
import {keySequence, keyToCodeMapping} from "@src/keyboard/utils.ts";
import {useSong} from "@src/keyboard/hooks/use-song.ts";

export default function Keyboard() {
  const songSetMapping: Record<string, number> = {
    'ArrowUp': 1,
    'ArrowLeft': 2,
    'ArrowDown': 3,
    'ArrowRight': 4,
  };

  const songs = ['equinox'];

  const [pressedKeys, setPressedKeys] = React.useState<string[]>([])
  const [songSet, setSongSet] = React.useState<number>(1);
  const {songTrackMapping} = useSong(songs[0], songSet);

  function playSound(key: string) {
    if (!Object.keys(songTrackMapping).includes(key)) {
      console.log("No mapping for key: ", key)
      return
    }

    songTrackMapping[key].play()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();

    if (event.repeat) return;
    console.log(event.code);

    if (Object.keys(songSetMapping).includes(event.code)) {
      setSongSet(songSetMapping[event.code]);
      return
    }

    playSound(event.code)

    const key = event.code;

    if (!pressedKeys.includes(key)) {
      setPressedKeys((prevKeys) => [...prevKeys, key]);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    event.preventDefault();
    setPressedKeys((prevKeys) => prevKeys.filter((pressedKey) => pressedKey !== event.code));
  };

  // console.log(pressedKeys)

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [])

  function rowsOfKeys() {
    return [
      keySequence.slice(0, 12),
      keySequence.slice(12, 24),
      keySequence.slice(24, 36),
      keySequence.slice(36,),
    ]
  }

  return (
    <div className="flex flex-col gap-20">
      <div className="keyboard">
        {rowsOfKeys().map((row, rowIndex) =>
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
        <div className={`keyboard-key ${songSet === 1 ? 'current-key-set' : ''}`}>1</div>
        <div className="flex gap-2">
          <div className={`keyboard-key ${songSet === 2 ? 'current-key-set' : ''}`}>2</div>
          <div className={`keyboard-key ${songSet === 3 ? 'current-key-set' : ''}`}>3</div>
          <div className={`keyboard-key ${songSet === 4 ? 'current-key-set' : ''}`}>4</div>
        </div>
      </div>
    </div>
  )
}