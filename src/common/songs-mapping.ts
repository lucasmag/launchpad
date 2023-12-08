import {Howl} from "howler";


type SongMapping = Record<string, string>
// export const equinoxMappingSet1: SongMapping = {
//   '1': 'c1',
//   '2': 'a0',
//   '3': 'a1',
//   '4': 'a2',
//   '5': 'a3',
//   '6': 'b0',
//   '7': 'b1',
//   '8': 'b2',
//   '9': 'b3',
//   '0': 'b3',
//   '-': 'd8',
//   '=': 'd12',
//   'q': 'c3',
//   'w': 'c5',
//   'e': 'a5',
//   'r': 'a6',
//   't': 'a7',
//   'y': 'b4',
//   'u': 'b5',
//   'i': 'b6',
//   'o': 'b7',
//   'p': 'd5',
//   '[': 'd6',
//   ']': 'd4',
//   'a': 'c2',
//   's': 'c7',
//   'd': 'a9',
//   'f': 'a10',
//   'g': 'a11',
//   'h': 'b8',
//   'j': 'b9',
//   'k': 'b10',
//   'l': 'b11',
//   ';': 'd1',
//   '\'': 'd0',
//   'Enter': 'e0',
//   'z': 'c6',
//   'x': 'a12',
//   'c': 'a13',
//   'v': 'a14',
//   'b': 'a15',
//   'n': 'b12',
//   'm': 'b13',
//   ',': 'b14',
//   '.': 'b15',
//   '/': 'd3',
//   'Shift': 'd2',
//   'Dead': 'd1',
// }
export const equinoxMappingSet1: SongMapping = {
  Digit1: 'c1',
  Digit2: 'a0',
  Digit3: 'a1',
  Digit4: 'a2',
  Digit5: 'a3',
  Digit6: 'b0',
  Digit7: 'b1',
  Digit8: 'b2',
  Digit9: 'b3',
  Digit0: 'b3',
  Minus: 'd8',
  Equal: 'd12',

  KeyQ: 'c3',
  KeyW: 'c5',
  KeyE: 'a5',
  KeyR: 'a6',
  KeyT: 'a7',
  KeyY: 'b4',
  KeyU: 'b5',
  KeyI: 'b6',
  KeyO: 'b7',
  KeyP: 'd5',
  BracketLeft: 'd6',
  BracketRight: 'd4',

  KeyA: 'c2',
  KeyS: 'c7',
  KeyD: 'a9',
  KeyF: 'a10',
  KeyG: 'a11',
  KeyH: 'b8',
  KeyJ: 'b9',
  KeyK: 'b10',
  KeyL: 'b11',
  Semicolon: 'd1',
  Quote: 'd0',
  Enter: 'e0',

  KeyZ: 'c6',
  KeyX: 'a12',
  KeyC: 'a13',
  KeyV: 'a14',
  KeyB: 'a15',
  KeyN: 'b12',
  KeyM: 'b13',
  Comma: 'b14',
  Period: 'b15',
  Slash: 'd3',
  ShiftRight: 'd2',
  IntlRo: 'd1',
}

export class SongMappingFactory {
  private songMapping: Record<string, Howl> = {}
  constructor(songName: string, songMapping: SongMapping) {
    Object.entries(songMapping).forEach(([key, value]) => {
      this.songMapping[key] = new Howl({src: `/src/assets/songs/${songName}/set1/${value}.mp3`})
    });
  }

  getSongMapping() {
    return this.songMapping
  }
}


