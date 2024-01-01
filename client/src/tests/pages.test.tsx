import {act, fireEvent, render, screen} from "@testing-library/react";
import {expect} from "vitest";
import App, {RoutesContainer} from "@src/App";

import './fetch.mock'
import {MemoryRouter} from "react-router-dom";
import {renderWithProviders} from "@src/tests/fetch.mock.tsx";


describe('test pages', () => {
  it('should allow user to go to play screen', async () => {
    render(<App />)

    fireEvent.click(await screen.findByRole('button'));

    await act(async () => {
      fireEvent.click(await screen.findByText('Skrillex - Kyoto'));
    })

    expect(window.location.pathname).toBe('/play');
  });

  it('should go back to song selection page when song name is not defined', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/play']}>
        <RoutesContainer />
      </MemoryRouter>
    );

    expect(window.location.pathname).toBe('/song-list');
  });

  it('should open song list', async () => {
    render(<App />);
    fireEvent.click(await screen.findByRole('button'));
    expect(screen.findByText('Choose a song to play')).resolves.toBeDefined();
  });
})