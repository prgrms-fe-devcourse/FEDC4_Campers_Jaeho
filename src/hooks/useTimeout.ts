import { useEffect } from 'react';

const useTimeout = (
  state: string | number | boolean,
  fn: () => void,
  delay = 150
) => {
  useEffect(() => {
    if (
      (['number', 'boolean'].includes(typeof state) && !state) ||
      (typeof state === 'string' && !state.length)
    ) {
      return;
    }

    const timeoutId = setTimeout(fn, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [state]);
};

export default useTimeout;
