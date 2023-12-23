/* eslint-disable @typescript-eslint/no-explicit-any */

import {KeySoundMapping, SongSet} from "@src/common/songs/song.types.ts";

export function zip(...arrays: any[]) {
  return arrays[0].map((_: any, i: any) => arrays.map(array => array[i]));
}

export const EMPTY_SONG_TRACK_MAPPING: Record<SongSet, KeySoundMapping> = {1: {}, 2: {}, 3: {}, 4:{}};


export const KEYBOARD_KEYS: string[] = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
  'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']',
  'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter',
  'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift', '',
]

export const KEY_CODES: string[] = [
  'Digit1',
  'Digit2',
  'Digit3',
  'Digit4',
  'Digit5',
  'Digit6',
  'Digit7',
  'Digit8',
  'Digit9',
  'Digit0',
  'Minus',
  'Equal',

  'KeyQ',
  'KeyW',
  'KeyE',
  'KeyR',
  'KeyT',
  'KeyY',
  'KeyU',
  'KeyI',
  'KeyO',
  'KeyP',
  'BracketLeft',
  'BracketRight',

  'KeyA',
  'KeyS',
  'KeyD',
  'KeyF',
  'KeyG',
  'KeyH',
  'KeyJ',
  'KeyK',
  'KeyL',
  'Semicolon',
  'Quote',
  'Enter',

  'KeyZ',
  'KeyX',
  'KeyC',
  'KeyV',
  'KeyB',
  'KeyN',
  'KeyM',
  'Comma',
  'Period',
  'Slash',
  'ShiftRight',
  'IntlRo'
]
export const keyToCodeMapping: Record<string, string> = (() => {
  const mapping: Record<string, string> = {}
  KEYBOARD_KEYS.map((key, index) => {
    mapping[key] = KEY_CODES[index]
  })
  return mapping;
})();

export const KEY_ROWS = [
  KEYBOARD_KEYS.slice(0, 12),
  KEYBOARD_KEYS.slice(12, 24),
  KEYBOARD_KEYS.slice(24, 36),
  KEYBOARD_KEYS.slice(36,),
]

export const SONG_KEY_SET_MAPPING: Record<string, SongSet> = {
  'ArrowUp': 2,
  'ArrowLeft': 1,
  'ArrowDown': 3,
  'ArrowRight': 4,
};

export enum LoadState {
  INITIALIZING = 'initializing',
  DOWNLOADING = 'downloading',
  EXTRACTING = 'extracting',
  MAPPING = 'mapping',
  DONE = 'done',
}



export const LOAD_STATUS: Record<LoadState, string> = {
  [LoadState.INITIALIZING]: 'Initializing',
  [LoadState.DOWNLOADING]: 'Downloading song files',
  [LoadState.EXTRACTING]: 'Extracting sounds',
  [LoadState.MAPPING]: 'Mapping sounds to keys',
  [LoadState.DONE]: 'Done',
}