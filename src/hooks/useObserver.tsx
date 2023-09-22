import { RefObject, useEffect, useRef } from 'react';

const useObserver = (showEvent: () => void): RefObject<HTMLElement | null> => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) showEvent();
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, [ref]);

  return ref;
};

export default useObserver;
