import { configureStore, combineReducers } from '@reduxjs/toolkit';
import songReducer from './songSlice.ts';

const rootReducer = combineReducers({
  song: songReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
