export const mergeStyles = (...classnames: (string | null | undefined)[]) => classnames.filter(Boolean).join(' ');

interface Styles extends CSSStyleDeclaration {
  scrollSnapAlign: string;
}

export const mapStyles = ($item: HTMLElement) => {
  const styles = window.getComputedStyle($item) as Styles;
  const paddingLeft = parseInt(styles.paddingLeft || '');
  const paddingRight = parseInt(styles.paddingRight || '');
  const [snapAlign] = styles.scrollSnapAlign.split(' ');
  return { paddingLeft, paddingRight, snapAlign };
};

export const mapItem = ({ $item, viewport }: { $item: HTMLElement; viewport: { offsetLeft: number } }) => {
  const { paddingLeft, paddingRight, snapAlign } = mapStyles($item);
  const from = $item.offsetLeft - viewport.offsetLeft + paddingLeft;
  const width = $item.offsetWidth - paddingRight;
  const to = from + width;

  return { from, width, to, paddingLeft, paddingRight, snapAlign };
};
