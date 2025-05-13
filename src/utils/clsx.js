/**
clsx 讓我們在 react 中撰寫 className 的時候更為方便與彈性 使用的時候是

將原本的 className='class-name' 中傳入字串的單引號改為傳入變數的大括號{}
在裡面呼叫 clsx()
透過 clsx() 這個 function 將裡面帶入的變數、字串等，組合成一個字串回傳給 className

tailwind-merge (tailwindCSS v4 要用 v3 版)

高效的組合 tailwindCSS

避免樣式衝突
去除重複


*/
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
