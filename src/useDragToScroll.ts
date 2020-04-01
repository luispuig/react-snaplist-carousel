import { useCallback, useRef, RefObject, useState } from 'react';
import { useEffect } from 'react';

import styles from './stylesdrag.css';
import { useScroll } from './useScroll';
import { isTouchDevice } from './utils';

// as found on stackoverflow: https://stackoverflow.com/a/19277804
const getClosest = (l: number[], t: number): number => l.reduce((p, c) => (Math.abs(c - t) < Math.abs(p - t) ? c : p));

const getElementPosition = (parent: HTMLElement, element: HTMLElement): number =>
  element.offsetLeft - (parent.offsetWidth / 2 - element.offsetWidth / 2) - parent.offsetLeft;

export const useDragToScroll = (ref: RefObject<any>, { disabled = false }: { disabled?: boolean } = {}) => {
  const goTo = useScroll({ ref });
  const elementPositions = useRef<number[]>([]);
  const timeout = useRef<number | null>(null);

  const dragThreshold = 2; // distance moved before isDragged is set to true and click on children is disabled
  const [isDragging, setIsDragging] = useState(false);
  console.log(isDragging, setIsDragging);
  const isDragged = useRef(false);
  const isDown = useRef(false);
  const startX = useRef(0);
  const slideX = useRef(0);

  // used to determine whether slider is scrolling. After scrolling ends, reset css classes
  const handleScrolling = useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      ref.current.removeEventListener('scroll', handleScrolling);
      isDragged.current = false;

      // Safari resets scroll position when removing the css class, manually
      // setting the scroll property afterwards seems to fix the problem
      // without flashing
      const currentX = ref.current.scrollLeft;
      ref.current.classList.remove(styles.snaplist_drag);
      ref.current.scrollLeft = currentX;
    }, 100) as any;
  }, [ref, timeout]);

  const handleMouseDown = useCallback(
    event => {
      event.preventDefault();
      isDown.current = true;
      startX.current = event.pageX - ref.current.offsetLeft;
      slideX.current = ref.current.scrollLeft;
    },
    [ref],
  );

  const handleMouseMove = useCallback(
    event => {
      if (!isDown.current) return;

      const distanceMoved = Math.abs(startX.current - (event.pageX - ref.current.offsetLeft));
      if (distanceMoved < dragThreshold) return; // skip further action, when not mouse movement is below threshold, thus no drag detected
      if (timeout.current) clearTimeout(timeout.current);
      isDragged.current = true;
      ref.current.classList.add(styles.snaplist_drag);

      const x = event.pageX - ref.current.offsetLeft;
      const displace = x - startX.current;
      ref.current.scrollLeft = slideX.current - displace;
    },
    [ref],
  );

  const handleMouseUp = useCallback(() => {
    isDown.current = false;
    if (!isDragged.current) return;

    const dragEndPosition = ref.current.scrollLeft;
    const scrollTarget = getClosest(elementPositions.current, dragEndPosition);

    ref.current.addEventListener('scroll', handleScrolling);
    const target = elementPositions.current.indexOf(scrollTarget);
    goTo(target);
  }, [ref, handleScrolling, goTo]);

  const handleClick = useCallback(
    event => {
      // we need this to prevent click events being fired on children
      if (!isDragged.current) return;

      event.stopPropagation();
      isDragged.current = false;
    },
    [isDragged],
  );

  const registerEventListeners = useCallback(() => {
    ref.current.addEventListener('mousedown', handleMouseDown);
    ref.current.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [ref, handleClick, handleMouseDown, handleMouseMove, handleMouseUp]);

  const removeEventListeners = useCallback(() => {
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
    elementPositions.current = Array.from(children).map((element: HTMLElement) => getElementPosition(target, element));

    registerEventListeners();
    return removeEventListeners;
  }, [ref, registerEventListeners, removeEventListeners, disabled]);
};
