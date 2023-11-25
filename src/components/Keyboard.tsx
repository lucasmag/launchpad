import React from "react";
import "./Keyboard.css"
import {Howl} from 'howler';
import {equinoxMappingSet1, SongMappingFactory} from "@src/common/songs-mapping.ts";

export default function Keyboard() {
  const [keyboardKeys] = React.useState([
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
    ['z', 'x', 'c', 'v' ,'b', 'n', 'm', ',', '.', '/', 'Shift', 'Dead']
  ])
  const [secondaryKeysMapping] = React.useState<Record<string, string>>({
    '?': '/',
    ':': ';',
    '>': '.',
    '<': ',',
    '}': ']',
    '{': '[',
    '!': '1',
    '@': '2',
    '#': '3',
    '$': '4',
    '%': '5',
    'Dead': '6',
    '&': '7',
    '*': '8',
    '(': '9',
    ')': '0',
    '_': '-',
    '+': '=',
  })
  const [pressedKeys, setPressedKeys] = React.useState<string[]>([])
  const [equinox, setEquinox] = React.useState<Record<string, Howl>>({})

  function playSound(key: string) {
    if (!Object.keys(equinox).includes(key)) {
      console.log("No mapping for key: ", key)
      return
    }

    equinox[key].play()
  }

  // console.log(pressedKeys)

  React.useEffect(() => {
    console.log('INICIANDO');

    const equinoxSongMapping = new SongMappingFactory('equinox', equinoxMappingSet1);
    setEquinox(equinoxSongMapping.getSongMapping());
  }, [])

  React.useEffect(() => {
    console.log("Handlers changed")

    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      console.log(event)

      if (event.repeat) return;

      playSound(event.key)

      const key = event.key;
      if (!pressedKeys.includes(key)) {
        setPressedKeys((prevKeys) => [...prevKeys, key]);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      event.preventDefault();

      setPressedKeys((prevKeys) => prevKeys.filter((pressedKey) =>
        pressedKey !== (prevKeys.includes('Shift') && event.key !== 'Shift' ? secondaryKeysMapping[event.key] : event.key)
      ));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [])

  return (
    <>
      <div className="keyboard">
        {keyboardKeys.map((row, rowIndex) =>
          <div key={rowIndex} className="keyboard-row">
            {
              row.map((key, keyIndex) =>
                <div key={keyIndex} className={`keyboard-key ${pressedKeys.includes(key) ? 'key-pressed' : ''}`}> {key} </div>
              )
            }
          </div>
        )}
      </div>
    </>
  )
}