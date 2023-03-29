import { useRef, useEffect } from 'react';

export default function useFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return inputRef;
}
