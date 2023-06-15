import {useEffect, useState} from "react";

const useLocalStorage = (key) => {
  const [value, setValue] = useState(() => {
    const actual = localStorage.getItem(key);
    return actual != null ? JSON.parse(actual) : null
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export {
  useLocalStorage
}