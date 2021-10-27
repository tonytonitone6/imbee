import { useRef, useEffect, useState, MutableRefObject } from 'react';

// on other hand, maybe we can create a intersection component to wrap component
// which includes above hooks
const useIntersectionObserver = (
  options: object
): [MutableRefObject<any>, boolean] => {
  const container = useRef<any>();
  const [isIntoView, setIsIntoView] = useState<boolean>(false);

  useEffect(() => {
    let observer: IntersectionObserver;
    let observerRef: Element | null = null;
    if (container.current) {
      observer = new IntersectionObserver(([entry]) => {
        const trigger = entry.isIntersecting;

        if (trigger) {
          setIsIntoView(true);
        } else {
          setIsIntoView(false);
        }
      }, options);
      observer.observe(container.current);
      observerRef = container.current;
    }

    return () => {
      if (observerRef) {
        observer.unobserve(observerRef);
      }
    };
  }, [options]);

  return [container, isIntoView];
};

export default useIntersectionObserver;
