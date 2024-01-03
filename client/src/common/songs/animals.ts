import { Song } from './song.types.ts';

class AnimalsSong extends Song {
  code = 'animals';
  name = 'Martin Garrix - Animals';
  // prettier-ignore
  mapping: Record<number, string[]> = {
    1: [
      "a0", "a1", "a2", "a3", "c0", "","b0", "b1", "b2", "b3", "d12","d13",
      "a4", "a5", "a6", "a7", "c4", "","b4", "b5", "b6", "b7", "",   "",
      "a8", "a9", "a10","a11","c12","","b8", "b9", "b10","b11","d14","d15",
      "a12","a13","a14","a15","c8", "","b12","b13","b14","b15","",   "",
    ],
    2: [
      "c12","c4","",   "",   "",   "a0","d0", "d1", "d2", "d3", "","",
      "c8", "",  "c5", "c6", "c7", "",  "d4", "d5", "d6", "d7", "","",
      "c0", "c1","c9", "c10","c11","",  "d8", "d9", "d10","d11","","",
      "c3", "c2","c13","c14","c15","",  "d12","d13","d14","d15","","",
    ],
    3: [
      "b0", "b1", "b2", "b3", "d0", "d1", "d2", "d3", "a0","a1","a2", "a3",
      "b4", "b5", "b6", "b7", "d4", "d5", "d6", "d7", "a4","a5","a6", "a7",
      "b8", "b9", "b10","b11","d8", "d9", "d10","d11","c4","c5","c6", "",
      "b12","b13","b14","b15","d12","d13","d14","d15","c8","c9","c10","",
    ],
    4: Array(48).fill('')
  };
  linkedKeys: Record<number, number[]> = {
    1: [],
    2: [],
    3: [],
    4: [],
  };
}

export const animals = new AnimalsSong();
