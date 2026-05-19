import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type Variant = "primary" | "secondary" | "delete"

type Props = {
  variant?: Variant
} & ComponentProps<"button">

export function Button({ variant = "primary", className, ...props }: Props) {
  return (
    <button
      {...props}
      className={twMerge(
        getVariantStyle(variant),
        "transition-colors rounded px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed",
        className,
      )}
    ></button>
  )
}

function getVariantStyle(variant: Variant) {
  switch (variant) {
    case "primary":
      return "bg-violet-600 hover:bg-violet-500"
    case "secondary":
      return "bg-zinc-700 hover:bg-zinc-600 text-zinc-400"
    case "delete":
      return "hover:bg-red-800 text-red-800 hover:text-red-200"
    default:
      throw new Error(`Variante inválida: ${variant satisfies never}`)
  }
}
