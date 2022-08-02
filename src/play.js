import { frequencies } from './data';

let timeout = null;
const ctx = new AudioContext;

export function playOne(n) {
  stop();
  const o = ctx.createOscillator(),
        g = ctx.createGain();
  o.type = 'sine';
  o.connect(g);
  o.frequency.value = frequencies[n];
  g.connect(ctx.destination);
  o.start(0);
  g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 2);
  setTimeout(() => o.disconnect(), 1000);
}

export function stop() {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
}

export function playSeries(ns) {
  const [ n, ...rest ] = ns;
  playOne(n);
  if (rest.length) timeout = setTimeout(() => playSeries(rest), 200);
}

export function playSeriesAddOct(ns) {
  playSeries([ ...ns, (ns[0] % 12) + 12 ]);
}
