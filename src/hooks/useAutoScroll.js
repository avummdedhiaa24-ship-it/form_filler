import { useEffect, useRef } from 'react';

export function useAutoScroll() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    element.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth',
    });
  });

  return scrollRef;
}
