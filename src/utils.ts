export const mergeStyles = (...classnames: (string | null | undefined)[]) => classnames.filter(Boolean).join(' ');

interface Styles extends CSSStyleDeclaration {
  scrollSnapAlign?: string;
  scrollPaddingLeft?: string;
  scrollPaddingRight?: string;
  scrollPaddingTop?: string;
  scrollPaddingBottom?: string;
}
const extractStyleProperty = (property: keyof Styles, styles: Styles): string => styles[property] || '';

export const mapStyles = ($item: HTMLElement) => {
  const styles = window.getComputedStyle($item) as Styles;
  return {
    paddingLeft: parseInt(extractStyleProperty('paddingLeft', styles)),
    paddingRight: parseInt(extractStyleProperty('paddingRight', styles)),
    paddingTop: parseInt(extractStyleProperty('paddingTop', styles)),
    paddingBottom: parseInt(extractStyleProperty('paddingBottom', styles)),
    snapAlign: extractStyleProperty('scrollSnapAlign', styles).split(' '),
    scrollPaddingLeft: parseInt(extractStyleProperty('scrollPaddingLeft', styles)),
    scrollPaddingRight: parseInt(extractStyleProperty('scrollPaddingRight', styles)),
    scrollPaddingTop: parseInt(extractStyleProperty('scrollPaddingTop', styles)),
    scrollPaddingBottom: parseInt(extractStyleProperty('scrollPaddingBottom', styles)),
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
