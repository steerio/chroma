import { h } from 'preact';
import classes from 'classnames';

import './Info.scss';

export const Info = ({ patterns }) => {
  const pattern = patterns?.[0];
  if (pattern) {
    return (
      <div class="info">
        <div class={classes('kind', `kind-${pattern.kind}`)}>{ pattern.label }</div>
        <p>{ pattern.name }</p>
        { pattern.subtitle && <p class="subtitle">{ pattern.subtitle }</p> }
      </div>
    );
  }
};
