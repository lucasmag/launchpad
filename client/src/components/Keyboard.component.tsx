import {keyToCodeMapping, KEY_ROWS} from "@src/common/consts.ts";
import {useStaggeringAnimation} from "@src/hooks/use-animation.ts";

import "./styles.css"

export default function Keyboard(props: {pressedKeys: string[]}) {
  const {pressedKeys} = props;
  useStaggeringAnimation('.keyboard-key');

  return (
    <div className="keyboard">
      {KEY_ROWS.map((row, rowIndex) =>
        <div key={rowIndex} className="keyboard-row">
          {
            row.map((key, columnIndex) =>
              <div
                key={columnIndex}
                className={`opacity-0 keyboard-key key ${pressedKeys?.includes(keyToCodeMapping[key]) ? 'key-pressed' : ''}`}
              >
                {key}
              </div>
            )
          }
        </div>
      )}
    </div>
  )
}