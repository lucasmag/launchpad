/* eslint-disable @typescript-eslint/no-explicit-any */
export function zip(...arrays: any[]) {
  return arrays[0].map((_: any, i: any) => arrays.map(array => array[i]));
}

export const keySequence: string[] = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
  'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']',
  'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter',
  'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift', '',
]

export const codeSequence: string[] = [
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
export const keyToCodeMapping: Record<string, string> = zip(keySequence, codeSequence);