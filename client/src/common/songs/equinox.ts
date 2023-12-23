import {Song} from "./song.types.ts";


class EquinoxSong extends Song {
  code = "equinox";
  name = "Skrillex - First Of The Year (Equinox)"
  mapping: Record<number, string[]> = {
    1: [
      'c1','a0', 'a1', 'a2', 'a3', 'b0', 'b1', 'b2', 'b3', 'b3','d8','d12',
      'c3','c5', 'a5', 'a6', 'a7', 'b4', 'b5', 'b6', 'b7', 'd5','d6','d4',
      'c2','c7', 'a9', 'a10','a11','b8', 'b9', 'b10','b11','d1','d0','e0',
      'c6','a12','a13','a14','a15','b12','b13','b14','b15','d3','d2','d1'
    ],
    2: [
      'a13','a14','a15','c2', 'c3', 'b0', 'b1', 'b2', 'b3', 'b3','d8','d12',
      'c1', '',   '',   'c6', 'c7', 'b4', 'b5', 'b6', 'b7', 'd5','d6','d4',
      'c5', 'c8', 'c9', 'c10','c11','b8', 'b9', 'b10','b11','d1','d0','d15',
      'e0', 'c12','c13','c14','c15','b12','b13','b14','b15','d3','d2','d1'
    ],
    3: [
      'a0', 'e2', 'a1','a3', 'd0', 'd1','d2', 'd3', 'b0', 'b1', 'b2', 'b3',
      'c3', 'e1', 'e3','c11','d4', 'd5','d6', 'd7', 'b4', 'b5', 'b6', 'b7',
      'c4', 'e0', 'e4','c2', 'd8', 'd9','d10','d11','b8', 'b9', 'b11','',
      'a12','c15','e5','c1', 'd12','c0','d14','d15','b12','b13','b14',''
    ],
    4: [
      'c0', 'c3', 'a15','','',   '',   '',   'b15','','','','',
      'c4', 'c7', '',   '','',   '',   'd6', 'd3', '','','','',
      'c8', 'c11','',   '','d12','d13','d14','d7', '','','','',
      'c12','c15','',   '','d8', 'd9', 'd10','d11','','','',''
    ]
  };
  linkedKeys: Record<number, number[]> = {
    1: [0, 12, 13, 24, 25, 36],
    2: [0, 1, 2, 3, 4, 12, 15, 16, 24, 26, 27, 28, 37,38, 39, 40],
    3: [4, 5, 6, 7, 16, 17,18, 19, 28, 29, 30, 31, 40, 42, 43],
    4: [7, 18, 19, 28, 29, 30, 31, 40, 41, 42, 43],
  }
}

export const equinox = new EquinoxSong();