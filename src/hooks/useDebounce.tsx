import { useState, useEffect } from "react";

const useDebounce = (value: string, delay: number = 300): string => {
  const [debounced, setDebounced] = useState<string>(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
};

export default useDebounce;
