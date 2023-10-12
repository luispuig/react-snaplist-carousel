import * as React from 'react';
import { mergeStyles } from './utils';

import styles from './styles.css';

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  direction: 'horizontal' | 'vertical';
  disableScroll?: boolean;
  snapType?: 'mandatory' | 'proximity';
  width?: string;
  height?: string;
  scrollPadding?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  hideScrollbar?: boolean;
  disabled?: boolean;
  className?: string;
}

const SnapListComponent: React.FC<CarouselProps> = (
  {
    children,
    direction = 'horizontal',
    disableScroll = false,
    snapType = 'mandatory',
    width,
    height,
    scrollPadding,
    hideScrollbar = true,
    disabled = false,
    className,
    style,
    ...props
  },
  ref: React.Ref<HTMLDivElement>,
) => {
  const dynamicStyles = React.useMemo(
    () => ({
      width,
      height,
      scrollPaddingTop: scrollPadding?.top ?? '0px',
      scrollPaddingRight: scrollPadding?.right ?? '0px',
      scrollPaddingBottom: scrollPadding?.bottom ?? '0px',
      scrollPaddingLeft: scrollPadding?.left ?? '0px',
      '--snaplist-snap-type': snapType ?? 'mandatory',
    }),
    [height, scrollPadding, snapType, width],
  );

  return (
    <div
      className={mergeStyles(
        'snaplist',
        styles.snaplist,
        styles[`snaplist_${direction}`],
        disabled ? null : styles[`snaplist_active_${direction}`],
        disableScroll ? styles.snaplist_scroll_disabled : styles[`snaplist_scroll_${direction}`],
        hideScrollbar ? styles.snaplist_hide_scrollbar : null,
        className,
      )}
      style={{ ...dynamicStyles, ...style }}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
};

type WithChildren<T> = T & { children?: React.ReactNode };

export const SnapList = React.forwardRef<HTMLDivElement, WithChildren<CarouselProps>>(SnapListComponent);

export const SnapItem: React.FC<{
  margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  width?: string;
  height?: string;
  snapAlign: 'start' | 'center' | 'end' | 'none';
  forceStop?: boolean;
  className?: string;
  children?: React.ReactNode;
}> = ({ children, margin, snapAlign = 'center', forceStop = false, width, height, className }) => (
  <div
    className={mergeStyles(
      'snapitem',
      styles.snapitem,
      styles[`snapitem_align_${snapAlign}`],
      forceStop ? styles.snapitem_forcestop : null,
      className,
    )}
    style={{
      marginTop: margin?.top,
      marginRight: margin?.right,
      marginBottom: margin?.bottom,
      marginLeft: margin?.left,
      width,
      height,
    }}
  >
    {children}
  </div>
);
