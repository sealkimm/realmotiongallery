import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

//// const로 바꾸기
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const removeAllowTransparency = value => {
  return value
    .replace(/\s*allowtransparency\s*(=\s*(['"])?.*?\2)?/gi, '')
    .replace(/\s*allowTransparency\s*(=\s*(['"])?.*?\2)?/g, '');
};
