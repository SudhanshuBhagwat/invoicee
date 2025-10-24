import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DEFAULT_DATE_FORMAT = "dd-MM-yyyy";

export function getAmount(amount: number) {
  return new Intl.NumberFormat("en-In", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}
