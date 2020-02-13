const easingOutQuint = (t: number, b: number, c: number, d: number) => c * ((t = t / d - 1) * t * t * t * t + 1) + b;

const smoothScrollPolyfill = (
  node: HTMLDivElement,
  key: 'scrollLeft' | 'scrollTop',
  target: number,
  duration: number,
) => {
  const startTime = Date.now();
  const offset = node[key];
  const gap = target - offset;
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
      cleanup();
      return;
    }
    node[key] = easingOutQuint(elapsed, offset, gap, duration);
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

export const smoothScroll = (node: HTMLDivElement | null, topOrLeft: number, horizontal = true, duration: number) => {
  if (!node) return;
  if (hasNativeSmoothScroll()) {
    return node.scrollTo({
      [horizontal ? 'left' : 'top']: topOrLeft,
      behavior: 'smooth',
    });
  } else {
    return smoothScrollPolyfill(node, horizontal ? 'scrollLeft' : 'scrollTop', topOrLeft, duration);
  }
};
