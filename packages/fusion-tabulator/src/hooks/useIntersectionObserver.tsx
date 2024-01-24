import React, { useEffect, useState } from 'react';

export const useIntersectionObserver = (
  ref: React.MutableRefObject<HTMLElement | null>,
) => {
  const [rectBound, setRectBount] = useState<DOMRectReadOnly>(null);
  useEffect(() => {
    if (ref.current) {
      // new `IntersectionObserver` constructor
      const observer = new IntersectionObserver((entries) => {
        // Loop through all `entries` returned by the observer
        for (const entry of entries) {
          // The `entry.boundingClientRect` is where all the dimensions are stored
          const bounds = entry.boundingClientRect;
          // Log the `bounds` for every element
          // console.log(bounds);
          setRectBount(bounds)
        }

        // Disconnect the observer to stop from running in the background
        observer.disconnect();
      });

      observer.observe(ref.current);

      // return () => {
      //   // Disconnect the observer to stop from running in the background
      //   observer.disconnect();
      // }
    }
  }, []);

  return [rectBound];
};