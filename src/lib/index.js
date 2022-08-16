export function numSort(a) {
  return a.sort((i, j) => i-j);
}

function arrEq(a, b, len) {
  for (let i=0; i<len; i++) {
    if (a[i] != b[i]) return false;
  }
  return true;
}

export function arrEqual(a, b) {
  const len = a.length;
  if (len != b.length) return false;
  return arrEq(a, b, len);
}

export function findPattern(a, b, mod=12) {
  const len = a.length;
  if (len != b.length) return -1;
  for (let i=0; i<mod; i++) {
    const aa = numSort(a.map(e => (e+i)%12));
    if (arrEq(aa, b, len)) return i;
  }
  return -1;
}
