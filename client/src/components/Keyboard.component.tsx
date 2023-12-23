import {keyToCodeMapping, KEY_ROWS} from "@src/common/utils.ts";
import "./styles.css"

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
                className={`keyboard-key ${pressedKeys?.includes(keyToCodeMapping[key]) ? 'key-pressed' : ''}`}
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