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

export function randomString() {
  return Math.random().toString(36).substring(2, 15)
}

export function handleExpandNode(
  setExpandedNodes: (
    setter: (expandedNodes: Set<string>) => Set<string>
  ) => void
) {
  return (nodeId: string) => {
    setExpandedNodes(expandedNodes => {
      const newExpandedNodes = new Set(expandedNodes)
      if (newExpandedNodes.has(nodeId)) {
        return new Set([...expandedNodes].filter(id => id !== nodeId))
      }
      return new Set([...expandedNodes, nodeId])
    })
  }
}

export function isAsyncFunction<Fn extends { constructor: { name: string } }>(
  fn: Fn
) {
  return fn.constructor.name === "AsyncFunction"
}

export function resolveSelectorPath(selectorFn: (state: any) => any): string[] {
  const paths: string[] = []

  const createProxy = () =>
    new Proxy(
      {},
      {
        get: (target, prop) => {
          if (typeof prop === "string") {
            paths.push(prop)
          }
          return createProxy()
        },
      }
    )

  selectorFn(createProxy())
  return paths
}
