import * as React from 'react';

export function useStaggeredAnimation(className: string) {
  React.useEffect(() => {
    const nodes: NodeListOf<HTMLDivElement> = document.querySelectorAll(className);

    nodes.forEach((div, index) => {
      setTimeout(() => {
        div.style.animation = 'stagger 1s ease-out';
        div.style.opacity = '1';
      }, index * 10);
    });
  }, [className]);
}

export function useFadeInAnimation(className: string, delay: number) {
  React.useEffect(() => {
    setTimeout(() => {
      const keys: NodeListOf<HTMLElement> = document.querySelectorAll(className);

      keys.forEach((div, index) => {
        setTimeout(() => {
          div.style.animation = 'fadeIn 1s ease-out';
          div.style.opacity = '1';
        }, index * 10);
      });
    }, delay * 1000);
  }, [className, delay]);
}