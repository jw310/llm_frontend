/**
 * 小數點後 2 位數無條件捨去
 */

export default function numToFixed(num, digits = 2) {
  num += '';
  let temp;
  let re = /([0-9]+.[0-9]{2})[0-9]*/;
  if (digits === 6) {
    re = /([0-9]+.[0-9]{6})[0-9]*/;
  }

  if (num.replace(re, '$1') === '0.0') {
    return '0';
  }

  return (temp = num.replace(re, '$1'));
}
