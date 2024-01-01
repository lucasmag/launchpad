import {fireEvent, screen} from "@testing-library/react";
import {expect} from "vitest";
import './fetch.mock.tsx';
import {vu} from "@src/tests/vitest.utils.tsx";

describe('test pages', () => {
  it('should allow user to open song list', async () => {
    const { router } = vu.visit('/');

    fireEvent.click(await screen.findByText('Start'));

    expect(router.state.location.pathname).toBe('/song-list');
    expect(screen.findByText('Choose a song to play')).resolves.not.toBeNull();
  });

  it('should allow user to go to play screen', async () => {
    const {router, container} = vu.visit('/');

    fireEvent.click(await screen.findByText('Start'));
    fireEvent.click(await screen.findByText('Skrillex - Kyoto'));

    await vu.waitFor(container, '.keyboard');

    expect(router.state.location.pathname).toBe('/play');
    expect(container).toMatchSnapshot();
  });

  it('should go back to song list page when song name is not defined', async () => {
    const {router} = vu.visit('/play')

    expect(router.state.location.pathname).toBe('/song-list');
    expect(screen.findByText('Choose a song to play')).resolves.not.toBeNull();
  });
})