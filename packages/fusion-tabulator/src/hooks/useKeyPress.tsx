import { useEffect } from 'react';

export type HandlerType = (e: KeyboardEvent) => void;

export const useKeyPress = (handler: HandlerType, elem = document.body) => {
  useEffect(() => {
    if (!elem) return;

    const listener = (event: KeyboardEvent) => {
      console.log('listen', event);
      handler(event);
    };

    elem.addEventListener('keyup', listener);

    return () => {
      elem.removeEventListener('keyup', listener);
    };
  }, [elem, handler]);
}