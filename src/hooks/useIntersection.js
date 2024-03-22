import { useCallback, useRef } from 'react';
const useIntersection = (callback) => {
  const observer = useRef(null);
  const intersectObject = useCallback(
    (node) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            callback && callback();
          }
        },
        { threshold: 1 }
      );
      if (node) observer.current.observe(node);
    },
    [callback]
  );
  return intersectObject;
};
export default useIntersection;