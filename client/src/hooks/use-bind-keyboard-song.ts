import React from "react";
import {EMPTY_SONG_TRACK_MAPPING, KEY_CODES, SONG_KEY_SET_MAPPING} from "@src/common/consts.ts";
import {Howl} from "howler";
import {useKeyboardInput} from "@src/hooks/use-keyboard-input.ts";
import {Song, SongSet} from "@src/common/songs/song.types.ts";
export function useBindKeyboardSong(song?: Song) {
  const {pressedKeys, onKeyPress} = useKeyboardInput();
  const [songSet, setSongSet] = React.useState<SongSet>(1);
  const songTrackMapping = React.useMemo(() => song?.getSongTrackMapping() || EMPTY_SONG_TRACK_MAPPING, [song]);
  const currentKeySoundMapping = React.useMemo(() => songTrackMapping[songSet] || EMPTY_SONG_TRACK_MAPPING[songSet], [songSet, songTrackMapping]);
  const linkedKeyPlaying = React.useRef<Howl | null>(null)

  const resolveLinkedKeys = React.useCallback((keyCode: string) => {
    if (song?.linkedKeys[songSet].includes(KEY_CODES.indexOf(keyCode))) {

      if (linkedKeyPlaying.current) {
        linkedKeyPlaying.current.stop();
        linkedKeyPlaying.current.off();
      }

      linkedKeyPlaying.current = currentKeySoundMapping[keyCode];

      currentKeySoundMapping[keyCode].once("end", () => {
        linkedKeyPlaying.current = null;
      })
    }
  }, [songSet, currentKeySoundMapping, song?.linkedKeys]);

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

  React.useEffect(() => () => {
    Object.values(songTrackMapping).forEach(keySoundMapping => {
      Object.values(keySoundMapping).forEach(sound => {
        if (sound?.playing()) sound?.fade(1, 0, 2000);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    songSet,
    pressedKeys
  };
}