/**
 * 千分位轉換
 */

export default function toThousands(num) {
  num += ""
  let arr = num.split(".")
  const re = /(\d{1,3})(?=(\d{3})+$)/g
  return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "")
}