import {act, fireEvent, render, screen} from "@testing-library/react";
import {expect} from "vitest";
import App from "@src/App";

import './fetch.mock'


describe('test pages', () => {
  it('should go back to song selection page when song name is not defined', async () => {
    render(<App />)

    await act(async () => {
      fireEvent.click(await screen.findByRole('button'));
    })

    await act(async () => {
      fireEvent.click(await screen.findByText('Skrillex - Kyoto'));
    })
  });

  it('should open song list', async () => {
    render(<App />);
    fireEvent.click(await screen.findByRole('button'));
    expect(screen.findByText('Choose a song to play')).resolves.toBeDefined();
  });
})