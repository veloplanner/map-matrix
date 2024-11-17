import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  function getStoredValue(): T {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }

  const [value, setValue] = useState<T>(getStoredValue);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
    }
  }, [value, key]);

  return [value, setValue] as const;
}
