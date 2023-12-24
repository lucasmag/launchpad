import React from "react";
import {EMPTY_SONG_TRACK_MAPPING, KEY_CODES, SONG_KEY_SET_MAPPING} from "@src/common/consts.ts";
import {Howl} from "howler";
import {useKeyboardInput} from "@src/hooks/use-keyboard-input.ts";
import {Song, SongSet} from "@src/common/songs/song.types.ts";
export function useBindKeyboardSong(song?: Song) {
  const {pressedKeys, onKeyPress} = useKeyboardInput();
  const [linkedKeyPlaying, setLinkedKeyPlaying] = React.useState<Howl | null>(null);
  const [songSet, setSongSet] = React.useState<SongSet>(1);
  const songTrackMapping = React.useMemo(() => song?.getSongTrackMapping() || EMPTY_SONG_TRACK_MAPPING, [song]);
  const currentKeySoundMapping = React.useMemo(() => songTrackMapping[songSet] || EMPTY_SONG_TRACK_MAPPING[songSet], [songSet, songTrackMapping]);

  const resolveLinkedKeys = React.useCallback((keyCode: string) => {
    if (song?.linkedKeys[songSet].includes(KEY_CODES.indexOf(keyCode))) {

      if (linkedKeyPlaying) {
        linkedKeyPlaying.stop();
        linkedKeyPlaying.off();
      }

      setLinkedKeyPlaying(currentKeySoundMapping[keyCode]);
      currentKeySoundMapping[keyCode].once("end", () => {
        setLinkedKeyPlaying(null);
      })
    }
  }, [songSet, currentKeySoundMapping, linkedKeyPlaying, song?.linkedKeys]);

  const play = React.useCallback((keyCode: string) => {
    if (!songTrackMapping[songSet][keyCode]) return;

    resolveLinkedKeys(keyCode);
    songTrackMapping[songSet][keyCode].play()
  }, [songSet, resolveLinkedKeys, songTrackMapping]);

  const handleKeyPress = React.useCallback((keyCode: string) => {
    if (Object.keys(SONG_KEY_SET_MAPPING).includes(keyCode)) {
      setSongSet(SONG_KEY_SET_MAPPING[keyCode]);
      return;
    }

    play(keyCode);
  }, [play, setSongSet]);

  React.useEffect(() => {
    onKeyPress(handleKeyPress);
  }, [onKeyPress, handleKeyPress]);

  return {
    songSet,
    pressedKeys
  };
}