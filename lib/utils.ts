import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { colors, emojis } from "@/styles/constants";
import CryptoJS from "crypto-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function encrypt(token: string) {
  return CryptoJS.AES.encrypt(
    token,
    process.env.VENMO_SECRET_KEY || ""
  ).toString();
}

export async function decrypt(token: string) {
  const bytes = CryptoJS.AES.decrypt(token, process.env.VENMO_SECRET_KEY || "");
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function getColorAndEmoji(name: string) {
  const colorIndex =
    Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  const emojiIndex =
    Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    emojis.length;
  const color = colors[colorIndex];
  const emoji = emojis[emojiIndex];

  return { color, emoji };
}

export function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function executedFunction(...args: any[]) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}

export const fetcher = (url: string) => fetch(url).then((r) => r.json());
