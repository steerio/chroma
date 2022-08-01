import { h } from 'preact';
import classes from 'classnames';

import './ScaleInfo.scss';

export const ScaleInfo = ({ scale }) => {
  const kind = scale.kind || 'scale';
  return (
    <div class="scale-info">
      <div class={classes('kind', `kind-${kind}`)}>{ kind }</div>
      <p>{ scale.en }</p>
      <p>{ scale.hu }</p>
    </div>
  );
};
