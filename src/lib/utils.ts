import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  const newInputs = inputs.map(i => {
    if (typeof i !== "string") return i
    return i.includes("\n") ? i.replace(/\s+/g, " ").trim() : i
  })
  return twMerge(clsx(newInputs))
}

// clsx tailwind-merge

export function capitalize(str?: string) {
  if (!str) return ""
  const words = str.split(" ")
  return words
    .map(word => {
      return word[0].toUpperCase() + word.substring(1)
    })
    .join(" ")
}
