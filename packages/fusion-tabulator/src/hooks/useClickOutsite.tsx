import { some } from 'lodash';
import { RefObject, useEffect } from 'react';

export type HandlerType = (e: MouseEvent) => void;

export function useClickOutside(
  refs: RefObject<HTMLElement>[],
  handler: HandlerType
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (
        refs.length < 1 ||
        some(refs, (ref) => ref.current?.contains(event.target as Node))
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refs.length, handler]);
}
