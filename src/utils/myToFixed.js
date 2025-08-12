// https://gist.github.com/FizzyElt/05c8c9878f07d15972acbda722b1a486

const findCloseZeroInt = (n, scale) => {
  const int = Math.trunc(n * 10 ** scale);
  let closeToZeroInt = int;
  let closeToZeroNum = Math.abs(int / 10 ** scale - n);
  for (const intNum of [int + 1, int - 1]) {
    const num = Math.abs(intNum / 10 ** scale - n);
    if (num < closeToZeroNum) {
      closeToZeroNum = num;
      closeToZeroInt = intNum;
    } else if (num === closeToZeroNum) {
      if (intNum > closeToZeroInt) {
        closeToZeroNum = num;
        closeToZeroInt = intNum;
      }
    }
  }

  return closeToZeroInt;
};

export default function myToFixed(value, scale) {
  let x = value;
  let s = '';

  if (x < 0) {
    s = '-';
    x = -x;
  }

  const n = findCloseZeroInt(x, scale);

  let m = '';
  if (n === 0) {
    m = '0';
  } else {
    m = n.toString();
  }

  let k = m.length;

  if (k <= scale) {
    const z = '0'.repeat(scale + 1 - k);

    m = z + m;

    k = scale + 1;
  }

  const a = m.slice(0, k - scale);
  const b = m.slice(k - scale);

  m = `${a}.${b}`;
  return s + m;
}
