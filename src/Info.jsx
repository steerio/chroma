import { h } from 'preact';
import classes from 'classnames';

import './Info.scss';

export const Info = ({ patterns, sel, dispatch }) => {
  if (patterns?.length) {
    return (
      <div class="info">
        { patterns.map((pattern, i) => (
          <div
            class={classes('info-item', { selected: sel == i })}
            onClick={() => dispatch('selectPattern', i)}
          >
            <div class={classes('kind', `kind--${pattern.kind}`)}>{ pattern.label }</div>
            <p>{ pattern.name }</p>
            { pattern.subtitle && <p class="subtitle">{ pattern.subtitle }</p> }
          </div>
        ))}
      </div>
    );
  }
};
