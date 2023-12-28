import {SongSet} from "@src/common/songs/song.types.ts";
import "./styles.css"
import ChevronLeft from "@src/shared/icons/chevron-left.tsx";

export default function SongSetSelector(props: {songSet: SongSet}) {
  const {songSet} = props;

  return (
    <div id="songset-selector">
      <div className={`relative key ${songSet === 2 ? 'current-key-set' : ''}`}>
        <div className="key-indicator">3</div>
        <ChevronLeft className="rotate-90"/>
      </div>
      <div className="flex gap-2">
        <div className={`relative key ${songSet === 1 ? 'current-key-set' : ''}`}>
          <div className="key-indicator">1</div>
          <ChevronLeft />
        </div>
        <div className={`relative key ${songSet === 3 ? 'current-key-set' : ''}`}>
          <div className="key-indicator">4</div>
          <ChevronLeft className="-rotate-90"/>
        </div>
        <div className={`relative key ${songSet === 4 ? 'current-key-set' : ''}`}>
          <div className="key-indicator">2</div>
          <ChevronLeft className="rotate-180"/>
        </div>
      </div>
    </div>
  )
}