import { useEffect, useRef } from 'react';

const defaultShowEvent = () => console.log('show!');

const useObserver = (showEvent = defaultShowEvent) => {
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
