import { useRef, useEffect } from 'react';

const useWindowMeasurer = () => {
  const widthRef = useRef(null);

  useEffect(() => {
    const ResizeHandler = () => {
      widthRef.current = window.innerWidth;
    };

    window.addEventListener('resize', ResizeHandler);

    return () => window.removeEventListener('resize', ResizeHandler);
  }, [widthRef]);

  return widthRef.current;
};

export default useWindowMeasurer;
