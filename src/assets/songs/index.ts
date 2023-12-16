import {Song} from "@src/assets/songs/song.types.ts";
import {equinox} from "@src/assets/songs/equinox";
import {knifeparty} from "@src/assets/songs/knifeparty";
import {kyoto} from "@src/assets/songs/kyoto";
import {animals} from "@src/assets/songs/animals";
import {surface} from "@src/assets/songs/surface";
import {electro} from "@src/assets/songs/electro";


export const Songs: Record<string, Song> = {
  equinox,
  kyoto,
  animals,
  knifeparty,
  surface,
  electro,
}