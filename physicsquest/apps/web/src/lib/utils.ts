import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tierForLevel(level: number): "wonderland" | "lab" | "studio" {
  if (level <= 3) return "wonderland";
  if (level <= 7) return "lab";
  return "studio";
}
