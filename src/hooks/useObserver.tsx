import { useEffect, useState, useRef } from 'react';

const useObserver = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        setInView(true);
      } else {
        setInView(false);
      }
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, [ref]);

  return { ref, inView };
};

export default useObserver;
