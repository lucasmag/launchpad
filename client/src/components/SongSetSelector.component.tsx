import {SongSet} from "@src/common/songs/song.types.ts";
import "./styles.css"

export default function SongSetSelector(props: {songSet: SongSet}) {
  const {songSet} = props;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`keyboard-key ${songSet === 2 ? 'current-key-set' : ''}`}>3</div>
      <div className="flex gap-2">
        <div className={`keyboard-key ${songSet === 1 ? 'current-key-set' : ''}`}>1</div>
        <div className={`keyboard-key ${songSet === 3 ? 'current-key-set' : ''}`}>4</div>
        <div className={`keyboard-key ${songSet === 4 ? 'current-key-set' : ''}`}>2</div>
      </div>
    </div>
  )
}