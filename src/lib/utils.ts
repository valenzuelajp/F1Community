import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple Tailwind CSS class names safely using clsx and tailwind-merge.
 * This prevents conflicting Tailwind classes (e.g., merging 'px-2' and 'px-4').
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
