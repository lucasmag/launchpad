import {SongSet} from "@src/common/songs/song.types.ts";
import "./styles.css"
import {useFadeInAnimation} from "@src/hooks/use-animation.ts";

export default function SongSetSelector(props: {songSet: SongSet}) {
  const {songSet} = props;
  useFadeInAnimation('.setKey', 1);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`opacity-0 setKey key ${songSet === 2 ? 'current-key-set' : ''}`}>3</div>
      <div className="flex gap-2">
        <div className={`opacity-0 setKey key ${songSet === 1 ? 'current-key-set' : ''}`}>1</div>
        <div className={`opacity-0 setKey key ${songSet === 3 ? 'current-key-set' : ''}`}>4</div>
        <div className={`opacity-0 setKey key ${songSet === 4 ? 'current-key-set' : ''}`}>2</div>
      </div>
    </div>
  )
}