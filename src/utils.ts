export const mergeStyles = (...classnames: (string | null | undefined)[]) => classnames.filter(Boolean).join(' ');

interface Styles extends CSSStyleDeclaration {
  scrollSnapAlign: string;
  scrollPaddingLeft: string;
  scrollPaddingRight: string;
  scrollPaddingTop: string;
  scrollPaddingBottom: string;
}

export const mapStyles = ($item: HTMLElement) => {
  const styles = window.getComputedStyle($item) as Styles;
  const paddingLeft = parseInt(styles.paddingLeft || '');
  const paddingRight = parseInt(styles.paddingRight || '');
  const paddingTop = parseInt(styles.paddingTop || '');
  const paddingBottom = parseInt(styles.paddingBottom || '');
  const [snapAlign] = (typeof styles.scrollSnapAlign === 'string' && styles.scrollSnapAlign.split(' ')) || [];
  const scrollPaddingLeft = parseInt(styles.scrollPaddingLeft || '');
  const scrollPaddingRight = parseInt(styles.scrollPaddingRight || '');
  const scrollPaddingTop = parseInt(styles.scrollPaddingTop || '');
  const scrollPaddingBottom = parseInt(styles.scrollPaddingBottom || '');
  return {
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    snapAlign,
    scrollPaddingLeft,
    scrollPaddingRight,
    scrollPaddingTop,
    scrollPaddingBottom,
  };
};

export const mapItem = ({
  $item,
  viewport,
}: {
  $item: HTMLElement;
  viewport: { offsetLeft: number; offsetTop: number };
}) => {
  const { paddingLeft, paddingRight, paddingTop, paddingBottom, snapAlign } = mapStyles($item);
  const left = $item.offsetLeft - viewport.offsetLeft + paddingLeft;
  const width = $item.offsetWidth - paddingLeft - paddingRight;
  const right = left + width;
  const top = $item.offsetTop - viewport.offsetTop + paddingTop;
  const height = $item.offsetHeight - paddingBottom - paddingTop;
  const bottom = top + height;

  return { left, width, right, top, height, bottom, paddingLeft, paddingRight, paddingTop, paddingBottom, snapAlign };
};

export const isTouchDevice = () =>
  !!(
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      (window.DocumentTouch && typeof document !== 'undefined' && document instanceof window.DocumentTouch))
  ) || !!(typeof navigator !== 'undefined' && (navigator.maxTouchPoints || navigator.msMaxTouchPoints));
