export const mergeStyles = (...classnames: (string | null | undefined)[]) => classnames.filter(Boolean).join(' ');

interface Styles extends CSSStyleDeclaration {
  scrollSnapAlign: string;
}

export const mapStyles = ($item: HTMLElement) => {
  const styles = window.getComputedStyle($item) as Styles;
  const paddingLeft = parseInt(styles.paddingLeft || '');
  const paddingRight = parseInt(styles.paddingRight || '');
  const paddingTop = parseInt(styles.paddingTop || '');
  const paddingBottom = parseInt(styles.paddingBottom || '');
  const [snapAlign] = styles.scrollSnapAlign.split(' ');
  return { paddingLeft, paddingRight, paddingTop, paddingBottom, snapAlign };
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
  const width = $item.offsetWidth - paddingRight;
  const right = left + width;
  const top = $item.offsetTop - viewport.offsetTop + paddingTop;
  const height = $item.offsetHeight - paddingBottom;
  const bottom = top + height;

  return { left, width, right, top, height, bottom, paddingLeft, paddingRight, paddingTop, paddingBottom, snapAlign };
};
