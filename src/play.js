import { frequencies } from './data';
import { modulo } from './lib';

let timeout = null;
const ctx = new AudioContext;

function frequency(n) {
  const freq = frequencies[n];
  if (freq) return freq;
  return frequencies[modulo(n, 12)] * Math.pow(2, Math.floor(n/12));
}

export function playOne(n) {
  stop();
  const o = ctx.createOscillator(),
        g = ctx.createGain();
  o.type = 'sine';
  o.connect(g);
  o.frequency.value = frequency(n);
  g.connect(ctx.destination);
  o.start(0);
  g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 2);
  setTimeout(() => o.disconnect(), 1000);
}

export function playAll(ns) {
  playSeries(ns, 20);
}

export function stop() {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
}

export function playSeries(ns, delay=200) {
  const [ n, ...rest ] = ns;
  playOne(n);
  if (rest.length) timeout = setTimeout(() => playSeries(rest, delay), delay);
}

export function playSeriesAddOct(ns) {
  playSeries([ ...ns, (ns[0] % 12) + 12 ]);
}
