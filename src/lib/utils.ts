import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// markdown editor에서 허용 투명 제거
export const removeAllowTransparency = (value: string) => {
  return value
    .replace(/\s*allowtransparency\s*(=\s*(['"])?.*?\2)?/gi, '')
    .replace(/\s*allowTransparency\s*(=\s*(['"])?.*?\2)?/g, '');
};

// 예제 썸네일 추출 (코드펜, 코드샌드박스만 있음)
export const extractThumbnailUrl = (content: string) => {
  const match = content.match(/<iframe[^>]+src="([^"]+)"[^>]*>/);
  if (!match) return '/default-thumbnail.png'; // 만들기

  const src = match[1];

  if (src.includes('codepen.io')) {
    const parts = src.match(/codepen\.io\/([^/]+)\/embed\/([^?]+)/);
    return `https://shots.codepen.io/${parts[1]}/pen/${parts[2]}-1280.jpg`;
  }

  if (src.includes('codesandbox.io')) {
    const parts = src.match(/codesandbox\.io\/embed\/([^?/]+)/);
    return `https://codesandbox.io/api/v1/sandboxes/${parts[1]}/screenshot.png`;
  }

  return '/default-thumbnail.png';
};
