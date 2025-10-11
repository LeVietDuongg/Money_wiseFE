'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      className={cn(
        "w-full min-h-[80px] rounded-md border border-gray-300 px-3 py-2 text-base placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
