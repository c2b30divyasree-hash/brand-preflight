type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | { [key: string]: unknown };

function clsx(...inputs: ClassValue[]): string {
  return inputs
    .flatMap((input) => {
      if (Array.isArray(input)) {
        return clsx(...input);
      }

      if (typeof input === "object" && input !== null) {
        return Object.entries(input)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key);
      }

      return input ? String(input) : "";
    })
    .filter(Boolean)
    .join(" ");
}

function twMerge(className: string): string {
  return className
    .split(/\s+/)
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index)
    .join(" ");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}