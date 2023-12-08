import React from "react";
import "./Keyboard.css"
import {Howl} from 'howler';
import {equinoxMappingSet1, SongMappingFactory} from "@src/common/songs-mapping.ts";

export default function Keyboard() {
  // const [keyboardKeys] = React.useState([
  //   ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  //   ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
  //   ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter'],
  //   ['Z', 'X', 'C', 'V' ,'B', 'N', 'M', ',', '.', '/', 'Shift', '']
  // ])

  const [keyToCode] = React.useState<Record<string, string>>({
    '1': 'Digit1',
    '2': 'Digit2',
    '3': 'Digit3',
    '4': 'Digit4',
    '5': 'Digit5',
    '6': 'Digit6',
    '7': 'Digit7',
    '8': 'Digit8',
    '9': 'Digit9',
    '0': 'Digit0',
    '-': 'Minus',
    '=': 'Equal',

    'Q': 'KeyQ',
    'W': 'KeyW',
    'E': 'KeyE',
    'R': 'KeyR',
    'T': 'KeyT',
    'Y': 'KeyY',
    'U': 'KeyU',
    'I': 'KeyI',
    'O': 'KeyO',
    'P': 'KeyP',
    '[': 'BracketLeft',
    ']': 'BracketRight',

    'A': 'KeyA',
    'S': 'KeyS',
    'D': 'KeyD',
    'F': 'KeyF',
    'G': 'KeyG',
    'H': 'KeyH',
    'J': 'KeyJ',
    'K': 'KeyK',
    'L': 'KeyL',
    ';': 'Semicolon',
    '\'': 'Quote',
    'Enter': 'Enter',

    'Z': 'KeyZ',
    'X': 'KeyX',
    'C': 'KeyC',
    'V': 'KeyV',
    'B': 'KeyB',
    'N': 'KeyN',
    'M': 'KeyM',
    ',': 'Comma',
    '.': 'Period',
    '/': 'Slash',
    'Shift': 'ShiftRight',
    '': 'IntlRo',
  })

  const [pressedKeys, setPressedKeys] = React.useState<string[]>([])
  const [equinox, setEquinox] = React.useState<Record<string, Howl>>({})

  function playSound(key: string) {
    if (!Object.keys(equinox).includes(key)) {
      // console.log("No mapping for key: ", key)
      return
    }

    equinox[key].play()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    console.log(event.keyCode, ' = ', event.code)

    if (event.repeat) return;

    playSound(event.code)

    const key = event.code;

    if (!pressedKeys.includes(key)) {
      setPressedKeys((prevKeys) => [...prevKeys, key]);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    event.preventDefault();

    setPressedKeys((prevKeys) => prevKeys.filter((pressedKey) =>
      pressedKey !== (prevKeys.includes('Shift') && event.code !== 'Shift' ? secondaryKeysMapping[event.code] : event.code)
    ));
  };

  // console.log(pressedKeys)

  React.useEffect(() => {
    console.log('INICIANDO');

    const equinoxSongMapping = new SongMappingFactory('equinox', equinoxMappingSet1);
    setEquinox(equinoxSongMapping.getSongMapping());
  }, [])

  React.useEffect(() => {
    console.log("Reloading")

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [equinox])


  return (
    <>
      <div className="keyboard">
        {Array(4).fill(null).map((_, rowIndex) =>
          <div key={rowIndex} className="keyboard-row">
            {
              Array(12).fill(null).map((_, columnIndex) => {
                const keyIndex = rowIndex * 12 + columnIndex;
                const key = Object.keys(keyToCode)[keyIndex];
                return (
                  <div key={keyIndex} className={`keyboard-key ${pressedKeys.includes(keyToCode[key]) ? 'key-pressed' : ''}`}>
                    <b>{key}</b>
                  </div>
                )
              })
            }
          </div>
        )}
      </div>
    </>
  )
}