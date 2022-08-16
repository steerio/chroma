import { h } from 'preact';
import classes from 'classnames';

import './Info.scss';

export const Info = ({ pattern }) => {
  const kind = pattern.kind || 'scale';
  return (
    <div class="info">
      <div class={classes('kind', `kind-${kind}`)}>{ kind }</div>
      <p>{ pattern.en }</p>
      <p>{ pattern.hu }</p>
    </div>
  );
};
