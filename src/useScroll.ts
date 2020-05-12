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

const normalize = (value: number, { min, max }: { min: number; max: number }) => {
  return Math.min(max, Math.max(min, value));
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
      const viewportStyles = mapStyles($viewport);
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
        scrollPaddingLeft: viewportStyles.scrollPaddingLeft,
        scrollPaddingRight: viewportStyles.scrollPaddingRight,
        scrollPaddingTop: viewportStyles.scrollPaddingTop,
        scrollPaddingBottom: viewportStyles.scrollPaddingBottom,
        scrollWidth: $viewport.scrollWidth,
        scrollHeight: $viewport.scrollHeight,
      };

      const item = mapItem({ $item, viewport });

      let target = { left: 0, top: 0 };
      switch (item.snapAlign) {
        case 'start':
          target = {
            left: item.left - item.paddingLeft - viewport.paddingLeft - viewport.scrollPaddingLeft,
            top: item.top - item.paddingTop - viewport.paddingTop - viewport.scrollPaddingTop,
          };
          break;
        case 'end':
          target = {
            left: item.left - (viewport.width - item.width) + viewport.paddingRight + viewport.scrollPaddingRight,
            top: item.top - (viewport.height - item.height) + viewport.paddingBottom + viewport.scrollPaddingBottom,
          };
          break;
        case 'center':
          target = {
            left: item.left - (viewport.width - item.width) / 2 - viewport.scrollPaddingLeft / 2,
            top: item.top - (viewport.height - item.height) / 2 - viewport.scrollPaddingTop / 2,
          };
          break;
      }

      const maxLeftScroll = viewport.scrollWidth - viewport.width;
      const maxTopScroll = viewport.scrollHeight - viewport.height;
      return {
        left: normalize(target.left, { min: 0, max: maxLeftScroll }),
        top: normalize(target.top, { min: 0, max: maxTopScroll }),
      };
    },
    [ref],
  );

  const goTo = useCallback(
    (element: number) => {
      const scrollTarget = getScrollFor(element);
      if (scrollTarget) {
        smoothScroll(ref.current, scrollTarget, 350);
      }
    },
    [getScrollFor, ref],
  );

  return goTo;
};
