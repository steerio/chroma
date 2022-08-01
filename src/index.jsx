import { h, render } from 'preact';
import { App } from './App';

window.addEventListener('load', () => {
  render(<App />, document.body);
});
