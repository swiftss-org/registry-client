import { useLayoutEffect, useRef } from 'react';

export const useAnimationClass = (className: string) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = ref.current;
    wrapper?.classList.add(className);

    return () => {
      wrapper?.classList.remove(className);
    };
  }, []);

  return {
    ref,
  };
};
