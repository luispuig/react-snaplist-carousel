import * as React from 'react';
import { mergeStyles } from './utils';

import styles from './styles.css';

interface CarouselProps {
  direction: 'horizontal' | 'vertical';
  enableSwipe?: boolean;
}

const SnapListComponent: React.FC<CarouselProps> = (
  { children, direction = 'horizontal', enableSwipe = true },
  ref: React.Ref<HTMLDivElement>,
) => (
  <div
    className={mergeStyles(
      styles.snaplist,
      styles[`snaplist_${direction}`],
      enableSwipe ? styles[`snaplist_swipe_${direction}`] : styles.snaplist_noswipe,
    )}
    ref={ref}
  >
    {children}
  </div>
);

type WithChildren<T> = T & { children?: React.ReactNode };

export const SnapList = React.forwardRef<HTMLDivElement, WithChildren<CarouselProps>>(SnapListComponent);

export const SnapItem: React.FC<{
  padding?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  snapAlign: 'start' | 'center' | 'end' | 'none';
  forceStop?: boolean;
}> = ({ children, padding, snapAlign = 'center', forceStop = false }) => (
  <div
    className={mergeStyles(
      styles.snapitem,
      styles[`snapitem_align_${snapAlign}`],
      forceStop ? styles.snapitem_forcestop : null,
    )}
    style={{
      paddingTop: padding?.top,
      paddingRight: padding?.right,
      paddingBottom: padding?.bottom,
      paddingLeft: padding?.left,
    }}
  >
    {children}
  </div>
);
