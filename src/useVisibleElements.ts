import { useEffect, useState, useCallback, RefObject } from 'react';

import { mapItem } from './utils';

const debounceHOF = (callback: () => void, ms: number) => {
  let timeout: any;
  return () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      callback();
    }, ms);
  };
};

export const getVisibleChildren = ($viewport?: HTMLDivElement | null) => {
  if (!$viewport) return { children: [], childrenInCenter: null };
  const viewport = {
    left: $viewport.scrollLeft,
    width: $viewport.offsetWidth,
    right: $viewport.scrollLeft + $viewport.offsetWidth,
    top: $viewport.scrollTop,
    height: $viewport.offsetHeight,
    bottom: $viewport.scrollTop + $viewport.offsetHeight,
    offsetLeft: $viewport.offsetLeft,
    offsetTop: $viewport.offsetTop,
    centerHorizontal: $viewport.scrollLeft + $viewport.offsetWidth / 2,
    centerVertical: $viewport.scrollTop + $viewport.offsetHeight / 2,
  };
  const children = [];
  const $items = $viewport.children;
  let childrenInCenter = null;
  for (let index = 0; index < $items.length; index++) {
    const $item = $items[index] as HTMLElement;
    const item = mapItem({ $item, viewport });
    const isVisibleHorizontally = item.left >= viewport.left && item.right <= viewport.right;
    const isVisibleVertically = item.top >= viewport.top && item.bottom <= viewport.bottom;
    const isInCenterHorizontally = item.left <= viewport.centerHorizontal && item.right >= viewport.centerHorizontal;
    const isInCenterVertically = item.top <= viewport.centerVertical && item.bottom >= viewport.centerVertical;
    if (isVisibleHorizontally && isVisibleVertically) {
      children.push(index);
    }
    if (isInCenterHorizontally && isInCenterVertically) {
      childrenInCenter = index;
    }
  }
  return { children, childrenInCenter };
};

export const useVisibleElements = <T>(
  {
    debounce = 10,
    ref,
  }: {
    ref: RefObject<HTMLDivElement>;
    debounce?: number;
  },
  selector: (elements: number[], childrenInCenter: number | null) => T,
): T => {
  const [result, setResult] = useState<T>(selector([0], null));

  const onChange = useCallback(() => {
    const { children: newVisibleChildren, childrenInCenter: newChildrenInCenter } = getVisibleChildren(ref.current);
    if (newVisibleChildren.length === 0) return;
    const newResult = selector(newVisibleChildren, newChildrenInCenter);

    setResult((result: T) => {
      return JSON.stringify(newResult) !== JSON.stringify(result) ? newResult : result;
    });
  }, [ref, selector]);

  const onChangeWithDebounce = useCallback(debounceHOF(onChange, debounce), [onChange]);

  useEffect(() => {
    const element = ref.current;
    element?.addEventListener('scroll', onChangeWithDebounce);
    window.addEventListener('resize', onChangeWithDebounce);
    window.addEventListener('orientationchange', onChangeWithDebounce);
    onChangeWithDebounce();
    return () => {
      element?.removeEventListener('scroll', onChangeWithDebounce);
      window.removeEventListener('resize', onChangeWithDebounce);
      window.removeEventListener('orientationchange', onChangeWithDebounce);
    };
  }, [onChangeWithDebounce, ref]);

  return result;
};
