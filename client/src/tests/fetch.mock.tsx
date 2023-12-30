import * as React from 'react';
import fs from "fs";
import {vi, Mock} from 'vitest';
import {PropsWithChildren} from "react";
import {Provider} from "react-redux";
import {AppStore, RootState, setupStore} from "@src/state/store.ts";
import {render, RenderOptions} from "@testing-library/react";
import path from "path";


// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

// @ts-expect-error: Mocked global Fetch.
global.fetch = vi.fn();

function createResponse() {
  const buffer = fs.readFileSync(path.join(__dirname, './song_test.zip'));
  const blob = new Blob([buffer], {type: 'application/zip'});
  return {
    blob: () => new Promise((resolve) => resolve(blob))
  }
}

(global.fetch as Mock).mockResolvedValue(createResponse());

export function mockFetch(data: any) {
  return {
    blob: () => Promise.resolve(data)
  }
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): React.ReactElement {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}