import { useCallback, useRef, RefObject, useState } from 'react';
import { useEffect } from 'react';
import { mapItem } from './utils';

import styles from './stylesdrag.css';
import { useScroll } from './useScroll';
import { isTouchDevice } from './utils';

// as found on stackoverflow: https://stackoverflow.com/a/19277804
const getClosest = (l: number[], t: number): number => l.reduce((p, c) => (Math.abs(c - t) < Math.abs(p - t) ? c : p));

const getElementPositionX = ($viewport: HTMLElement, $item: HTMLElement): number => {
  const viewport = {
    width: $viewport.offsetWidth,
    height: $viewport.offsetHeight,
    offsetLeft: $viewport.offsetLeft,
    offsetTop: $viewport.offsetTop,
  };
  const item = mapItem({ $item, viewport });
  return item.left - (viewport.width / 2 - item.width / 2);
};

const getElementPositionY = ($viewport: HTMLElement, $item: HTMLElement): number => {
  const viewport = {
    width: $viewport.offsetWidth,
    height: $viewport.offsetHeight,
    offsetLeft: $viewport.offsetLeft,
    offsetTop: $viewport.offsetTop,
  };
  const item = mapItem({ $item, viewport });
  return item.top - (viewport.height / 2 - item.height / 2);
};

const dragThreshold = 2; // distance moved before isDragged is set to true and click on children is disabled

interface Styles extends CSSStyleDeclaration {
  scrollSnapType: string;
}

export const useDragToScroll = ({ ref, disabled = false }: { ref: RefObject<HTMLDivElement>; disabled?: boolean }) => {
  const goToChildren = useScroll({ ref });
  const elementPositionsX = useRef<number[]>([]);
  const elementPositionsY = useRef<number[]>([]);
  const timeout = useRef<number | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const isDown = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const slideX = useRef(0);
  const slideY = useRef(0);
  const originalScrollSnapType = useRef<string | undefined>(undefined);

  // used to determine whether slider is scrolling. After scrolling ends, reset css classes
  const handleScrolling = useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      if (!ref.current) return;
      ref.current.removeEventListener('scroll', handleScrolling);
      setIsDragging(false);
      // Safari resets scroll position when removing the css class, manually
      // setting the scroll property afterwards seems to fix the problem
      // without flashing
      const currentX = ref.current?.scrollLeft;
      const currentY = ref.current?.scrollTop;
      ref.current.classList.remove(styles.snaplist_drag);
      ref.current.scrollLeft = currentX;
      ref.current.scrollTop = currentY;
    }, 50) as any;
  }, [ref, timeout]);

  const handleMouseDown = useCallback(
    event => {
      if (!ref.current) return;
      event.preventDefault();
      isDown.current = true;
      startX.current = event.pageX - ref.current.offsetLeft;
      slideX.current = ref.current.scrollLeft;
      startY.current = event.pageY - ref.current.offsetTop;
      slideY.current = ref.current.scrollTop;
    },
    [ref],
  );

  const handleMouseMove = useCallback(
    event => {
      if (!ref.current) return;
      if (!isDown.current) return;

      const distanceMoved = Math.abs(startX.current - (event.pageX - ref.current.offsetLeft));
      if (distanceMoved < dragThreshold) return; // skip further action, when not mouse movement is below threshold, thus no drag detected
      if (timeout.current) clearTimeout(timeout.current);
      if (!isDragging) {
        setIsDragging(true);
        const snapListStyles = window.getComputedStyle(ref.current) as Styles;
        if (originalScrollSnapType.current === undefined) {
          originalScrollSnapType.current = snapListStyles.scrollSnapType.toString();
        }
      }
      ref.current.classList.add(styles.snaplist_drag);

      const x = event.pageX - ref.current.offsetLeft;
      const displaceX = x - startX.current;
      ref.current.scrollLeft = slideX.current - displaceX;
      const y = event.pageY - ref.current.offsetTop;
      const displaceY = y - startY.current;
      ref.current.scrollTop = slideY.current - displaceY;
    },
    [isDragging, ref],
  );

  const handleMouseUp = useCallback(() => {
    if (!ref.current) return;
    isDown.current = false;
    if (!isDragging) return;
    ref.current.addEventListener('scroll', handleScrolling);

    if (originalScrollSnapType.current === 'none') return;

    const dragEndPositionX = ref.current.scrollLeft;
    const dragEndPositionY = ref.current.scrollTop;
    const scrollTargetX = getClosest(elementPositionsX.current, dragEndPositionX);
    const scrollTargetY = getClosest(elementPositionsY.current, dragEndPositionY);

    const target =
      scrollTargetX > 0
        ? elementPositionsX.current.indexOf(scrollTargetX)
        : elementPositionsY.current.indexOf(scrollTargetY);
    goToChildren(target);
  }, [ref, handleScrolling, goToChildren, isDragging]);

  const handleClick = useCallback(
    event => {
      // we need this to prevent click events being fired on children
      if (!isDragging) return;
      event.stopPropagation();
      setIsDragging(false);
    },
    [isDragging],
  );

  const registerEventListeners = useCallback(() => {
    if (!ref.current) return;
    ref.current.addEventListener('mousedown', handleMouseDown);
    ref.current.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [ref, handleClick, handleMouseDown, handleMouseMove, handleMouseUp]);

  const removeEventListeners = useCallback(() => {
    if (!ref.current) return;
    ref.current.removeEventListener('mousedown', handleMouseDown);
    ref.current.removeEventListener('click', handleClick);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [ref, handleClick, handleMouseDown, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    // skip on touch devices
    if (!ref.current || isTouchDevice() || disabled) return;

    const target = ref.current;
    const children = target.children;
    elementPositionsX.current = Array.from(children).map((element: HTMLElement) =>
      getElementPositionX(target, element),
    );
    elementPositionsY.current = Array.from(children).map((element: HTMLElement) =>
      getElementPositionY(target, element),
    );

    registerEventListeners();
    return removeEventListeners;
  }, [ref, registerEventListeners, removeEventListeners, disabled]);

  return { isDragging, disable: removeEventListeners, enable: registerEventListeners };
};
