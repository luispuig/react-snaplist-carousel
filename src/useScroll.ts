import { RefObject } from 'react';

import { smoothScroll } from './smoothScroll';
import { mapItem, mapStyles } from './utils';

const delay = (ms: number) =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

const toArray = ($items: HTMLCollection) => {
  const children = [];
  for (let index = 0; index < $items.length; index++) {
    const $item = $items[index] as HTMLElement;
    children.push($item);
  }
  return children;
};
export const useScroll = ({ ref, duration = 800 }: { ref: RefObject<any>; duration?: number }) => {
  const getScrollFor = (element: number) => {
    const $viewport: HTMLElement = ref.current;
    if (!$viewport) return;
    const $items = toArray($viewport.children);
    const $item = element >= 0 && $items.length ? $items[element] : null;
    if (!$item) return;

    const viewport = {
      from: $viewport.scrollLeft,
      width: $viewport.offsetWidth,
      to: $viewport.scrollLeft + $viewport.offsetWidth,
      offsetLeft: $viewport.offsetLeft,
      paddingLeft: mapStyles($items[0]).paddingLeft,
      paddingRight: mapStyles($items[$items.length - 1]).paddingRight,
    };

    const item = mapItem({ $item, viewport });

    switch (item.snapAlign) {
      case 'start':
        return item.from - item.paddingLeft - viewport.paddingLeft;
      case 'end':
        return item.from - (viewport.width - item.width) + viewport.paddingRight;
      case 'center':
        return item.from - (viewport.width - item.width) / 2;

      default:
        return;
    }
  };

  const goTo = async (element: number) => {
    const scrollTarget = getScrollFor(element);
    if (scrollTarget) {
      smoothScroll(ref.current, scrollTarget, true, duration);
      await delay(duration);
    }
  };

  return goTo;
};
