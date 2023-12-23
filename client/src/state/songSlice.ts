import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SongState {
  name?: string;
}

const initialState: SongState = {}

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    }
  },
});

export const {setName} = songSlice.actions;
export default songSlice.reducer;