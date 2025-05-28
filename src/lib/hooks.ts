import { useEffect, useRef } from "react";

// useIsMounted is a custom hook that returns a function to check if the component is mounted
export function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return () => isMounted.current;
}

