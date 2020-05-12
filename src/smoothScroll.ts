const easingOutQuint = (t: number, b: number, c: number, d: number) => c * ((t = t / d - 1) * t * t * t * t + 1) + b;

const smoothScrollPolyfill = ({
  node,
  scrollTarget,
  duration,
}: {
  node: HTMLDivElement;
  scrollTarget: { left: number; top: number };
  duration: number;
}) => {
  const startTime = Date.now();
  const offsetLeft = node.scrollLeft;
  const offsetTop = node.scrollTop;
  const gapHorizontal = scrollTarget.left - offsetLeft;
  const gapVertical = scrollTarget.top - offsetTop;
  let interrupt = false;

  const cleanup = () => {
    node.removeEventListener('wheel', cancel); // eslint-disable-line @typescript-eslint/no-use-before-define
    node.removeEventListener('touchstart', cancel); // eslint-disable-line @typescript-eslint/no-use-before-define
  };

  const step = () => {
    const elapsed = Date.now() - startTime;
    const percentage = elapsed / duration;
    if (interrupt) return;
    if (percentage > 1) {
      node.scrollLeft = scrollTarget.left;
      node.scrollTop = scrollTarget.top;
      cleanup();
      return;
    }
    const nextScrollLeft = easingOutQuint(elapsed, offsetLeft, gapHorizontal, duration);
    const nextScrollTop = easingOutQuint(elapsed, offsetTop, gapVertical, duration);

    node.scrollLeft = Math.abs(scrollTarget.left - nextScrollLeft) <= 1 ? scrollTarget.left : nextScrollLeft;
    node.scrollTop = Math.abs(scrollTarget.top - nextScrollTop) <= 1 ? scrollTarget.top : nextScrollTop;
    requestAnimationFrame(step);
  };

  const cancel = () => {
    interrupt = true;
    cleanup();
  };

  node.addEventListener('wheel', cancel, { passive: true });
  node.addEventListener('touchstart', cancel, { passive: true });

  step();

  return cancel;
};

const hasNativeSmoothScroll = () => {
  let supports = false;
  const fakeScrollToOptions = {
    top: 0,
    get behavior() {
      supports = true;
      return 'smooth';
    },
  };
  try {
    const div = document.createElement('div');
    div.scrollTo(fakeScrollToOptions as any);
  } catch (err) {} // eslint-disable-line no-empty
  return supports;
};

export const smoothScroll = (
  node: HTMLDivElement | null,
  scrollTarget: { left: number; top: number },
  duration: number,
) => {
  if (!node) return;
  if (hasNativeSmoothScroll()) {
    return node.scrollTo({
      left: scrollTarget.left,
      top: scrollTarget.top,
      behavior: 'smooth',
    });
  } else {
    return smoothScrollPolyfill({ node, scrollTarget, duration });
  }
};
