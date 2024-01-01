import * as tl from "@testing-library/react";
import {createMemoryRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import {RoutesContainer} from "@src/App.tsx";
import * as React from "react";
import {AppStore, RootState, setupStore} from "@src/state/store.ts";
import {PropsWithChildren} from "react";
import {Provider} from "react-redux";
import {render, RenderOptions} from "@testing-library/react";


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
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

const waitFor = async (container: HTMLElement, selector: string) => {
  await tl.waitFor(() => {
    const element = container.querySelector(selector);

    if (!element) {
      throw new Error(`Cannot find selector "${selector}"`);
    }
  });
};

function visit(path: string) {
  const routesContainer = createRoutesFromElements(RoutesContainer().props.children);
  const router = createMemoryRouter( routesContainer, { initialEntries: [path] });
  const provider = <RouterProvider router={router} />;

  return {
    ...renderWithProviders(provider),
    router
  }
}

export const vu = {
  waitFor,
  visit
}