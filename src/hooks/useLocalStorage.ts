import { useState } from "react"

export function useLocalStorage(key: string, initialValue:unknown) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key)
    if(typeof saved === "string") {
      return JSON.parse(saved)
    }
    return initialValue
  })

  const update = (val: unknown) => {
    setValue(val)
    localStorage.setItem(key, JSON.stringify(val))
  }

  return [value, update]
}