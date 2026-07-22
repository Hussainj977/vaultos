"use client";

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initial: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [val, setVal] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(val));
    }
  }, [key, val]);

  return [val, setVal];
}
