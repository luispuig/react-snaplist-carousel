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
  paddingLeft?: string;
  paddingRight?: string;
  paddingTop?: string;
  paddingBottom?: string;
  snapAlign: 'start' | 'center' | 'end' | 'none';
  forceStop?: boolean;
}> = ({
  children,
  paddingLeft = '0px',
  paddingRight = '0px',
  paddingTop = '0px',
  paddingBottom = '0px',
  snapAlign = 'center',
  forceStop = false,
}) => {
  const style = { paddingLeft, paddingRight, paddingTop, paddingBottom };
  return (
    <div
      className={mergeStyles(
        styles.snapitem,
        styles[`snapitem_align_${snapAlign}`],
        forceStop ? styles.snapitem_forcestop : null,
      )}
      style={style}
    >
      {children}
    </div>
  );
};
