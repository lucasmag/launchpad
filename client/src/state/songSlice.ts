import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SongSet } from '@src/common/songs/song.types.ts';

export type LocalSong = Record<SongSet, Record<string, string>>;

interface SongState {
  currentSongName: string | null;
  songs: Record<string, LocalSong>;
}

const initialState: SongState = { songs: {}, currentSongName: null };

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string | null>) => {
      state.currentSongName = action.payload;
    },
    saveSong: (state, action: PayloadAction<Record<string, LocalSong>>) => {
      state.songs = { ...state.songs, ...action.payload };
    },
  },
});

export const { setName, saveSong } = songSlice.actions;
export default songSlice.reducer;
