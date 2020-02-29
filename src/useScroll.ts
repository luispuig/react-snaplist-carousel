import { RefObject, useCallback } from 'react';

import { smoothScroll } from './smoothScroll';
import { mapItem, mapStyles } from './utils';

const toArray = ($items: HTMLCollection) => {
  const children = [];
  for (let index = 0; index < $items.length; index++) {
    const $item = $items[index] as HTMLElement;
    children.push($item);
  }
  return children;
};
export const useScroll = ({ ref }: { ref: RefObject<any> }) => {
  const getScrollFor = useCallback(
    (
      element: number,
    ):
      | {
          left: number;
          top: number;
        }
      | undefined => {
      const $viewport: HTMLElement = ref.current;
      if (!$viewport) return;
      const $items = toArray($viewport.children);
      const $item = element >= 0 && $items.length ? $items[element] : null;
      if (!$item) return;

      const viewport = {
        left: $viewport.scrollLeft,
        width: $viewport.offsetWidth,
        right: $viewport.scrollLeft + $viewport.offsetWidth,
        top: $viewport.scrollTop,
        height: $viewport.offsetHeight,
        bottom: $viewport.scrollTop + $viewport.offsetHeight,
        offsetLeft: $viewport.offsetLeft,
        offsetTop: $viewport.offsetTop,
        paddingLeft: mapStyles($items[0]).paddingLeft,
        paddingRight: mapStyles($items[$items.length - 1]).paddingRight,
        paddingTop: mapStyles($items[0]).paddingTop,
        paddingBottom: mapStyles($items[$items.length - 1]).paddingBottom,
      };

      const item = mapItem({ $item, viewport });

      switch (item.snapAlign) {
        case 'start':
          return {
            left: item.left - item.paddingLeft - viewport.paddingLeft,
            top: item.top - item.paddingTop - viewport.paddingTop,
          };
        case 'end':
          return {
            left: item.left - (viewport.width - item.width) + viewport.paddingRight,
            top: item.top - (viewport.height - item.height) + viewport.paddingBottom,
          };
        case 'center':
          return {
            left: item.left - (viewport.width - item.width) / 2,
            top: item.top - (viewport.height - item.height) / 2,
          };

        default:
          return { left: 0, top: 0 };
      }
    },
    [ref],
  );

  const goTo = useCallback(
    (element: number) => {
      const scrollTarget = getScrollFor(element);
      if (scrollTarget) {
        smoothScroll(ref.current, scrollTarget, 800);
      }
    },
    [getScrollFor, ref],
  );

  return goTo;
};
