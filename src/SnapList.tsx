import * as React from 'react';
import { combineClassnames as c } from './utils';

import styles from './styles.css';

interface CarouselProps {}

const SnapListComponent: React.FC<CarouselProps> = ({ children }, ref: React.Ref<HTMLDivElement>) => (
  <div className={styles.snaplist} ref={ref}>
    {children}
  </div>
);

type WithChildren<T> = T & { children?: React.ReactNode };

export const SnapList = React.forwardRef<HTMLDivElement, WithChildren<CarouselProps>>(SnapListComponent);

export const SnapItem: React.FC<{
  paddingLeft?: string;
  paddingRight?: string;
  snapAlign: 'start' | 'center' | 'end' | 'none';
  forceStop?: boolean;
}> = ({ children, paddingLeft = '0px', paddingRight = '0px', snapAlign = 'center', forceStop = false }) => {
  const style = { paddingLeft, paddingRight };
  return (
    <div
      className={c(styles.snapitem, styles[`snapitem_${snapAlign}`], forceStop ? styles.snapitem_forcestop : null)}
      style={style}
    >
      {children}
    </div>
  );
};
