import React from 'react';

export function useKeyboardInput() {
  const [pressedKeys, setPressedKeys] = React.useState<string[]>([]);
  const [processKeyCode, setProcessKeyCode] = React.useState<
    (key: string) => void
  >(() => {});

  function onKeyPress(func: (key: string) => void) {
    setProcessKeyCode(() => func);
  }

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.repeat) return;

      processKeyCode(event.code);

      const key = event.code;
      if (!pressedKeys.includes(key)) {
        setPressedKeys((prevKeys) => [...prevKeys, key]);
      }
    },
    [pressedKeys, processKeyCode],
  );

  const handleKeyUp = React.useCallback((event: KeyboardEvent) => {
    event.preventDefault();
    setPressedKeys((prevKeys) =>
      prevKeys.filter((pressedKey) => pressedKey !== event.code),
    );
  }, []);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return {
    pressedKeys,
    onKeyPress,
  };
}
