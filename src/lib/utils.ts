import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) {
    return 'Android';
  } else if (/iPhone|iPad|iPod/i.test(ua)) {
    return 'iOS';
  } else {
    return 'Web';
  }
};
