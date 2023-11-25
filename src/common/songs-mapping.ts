import {Howl} from "howler";


type SongMapping = Record<string, string>
export const equinoxMappingSet1: SongMapping = {
  '1': 'c1',
  '2': 'a0',
  '3': 'a1',
  '4': 'a2',
  '5': 'a3',
  '6': 'b0',
  '7': 'b1',
  '8': 'b2',
  '9': 'b3',
  '0': 'b3',
  '-': 'd8',
  '=': 'd12',
  'q': 'c3',
  'w': 'c5',
  'e': 'a5',
  'r': 'a6',
  't': 'a7',
  'y': 'b4',
  'u': 'b5',
  'i': 'b6',
  'o': 'b7',
  'p': 'd5',
  '[': 'd6',
  ']': 'd4',
  'a': 'c2',
  's': 'c7',
  'd': 'a9',
  'f': 'a10',
  'g': 'a11',
  'h': 'b8',
  'j': 'b9',
  'k': 'b10',
  'l': 'b11',
  ';': 'd1',
  '\'': 'd0',
  'Enter': 'e0',
  'z': 'c6',
  'x': 'a12',
  'c': 'a13',
  'v': 'a14',
  'b': 'a15',
  'n': 'b12',
  'm': 'b13',
  ',': 'b14',
  '.': 'b15',
  '/': 'd3',
  'Shift': 'd2',
  'Dead': 'd1',
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


