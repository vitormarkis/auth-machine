import React from "react"
import { cn } from "~/lib/utils"

export type IconHeartFullProps = React.ComponentPropsWithoutRef<"svg">

export const IconHeartFull = React.forwardRef<
  React.ElementRef<"svg">,
  IconHeartFullProps
>(function IconHeartFullComponent({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className={cn("", className)}
      {...props}
    >
      <rect
        width={256}
        height={256}
        fill="none"
      />
      <path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z" />
    </svg>
  )
})
