import {Song} from "./song.types.ts";
import {equinox} from "./equinox";
import {knifeparty} from "./knifeparty";
import {kyoto} from "./kyoto";
import {animals} from "./animals";
import {surface} from "./surface";
import {electro} from "./electro";


export const Songs: Record<string, Song> = {
  equinox,
  kyoto,
  animals,
  knifeparty,
  surface,
  electro,
}