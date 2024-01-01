import fs from 'fs';
import { vi, Mock } from 'vitest';
import path from 'path';

// @ts-expect-error: Mocked global Fetch.
global.fetch = vi.fn();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
global.URL.createObjectURL = (_: never) => 'https://test.com/123';

function createResponse() {
  const buffer = fs.readFileSync(path.join(__dirname, './song_test.zip'));
  const blob = new Blob([buffer], { type: 'application/zip' });
  return {
    blob: () => new Promise((resolve) => resolve(blob)),
  };
}

(global.fetch as Mock).mockResolvedValue(createResponse());
