import {keyToCodeMapping, KEY_ROWS} from "@src/common/consts.ts";

import "@src/styles/keyboard.component.css"
import "@src/shared/style.css"

export default function Keyboard(props: {pressedKeys: string[]}) {
  const {pressedKeys} = props;

  return (
    <div className="keyboard">
      {KEY_ROWS.map((row, rowIndex) =>
        <div key={rowIndex} className="keyboard-row">
          {
            row.map((key, columnIndex) =>
              <div
                key={columnIndex}
                style={{animationDelay: `${(rowIndex * 12 + columnIndex) * 10}ms`}}
                className={`opacity-0 animate-stagger key ${pressedKeys?.includes(keyToCodeMapping[key]) ? 'key-pressed' : ''}`}
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