import React, { useRef, useEffect, useCallback, useState } from 'react';
import { SnapList, SnapItem, useScroll } from 'react-snaplist-carousel';
import { Frame } from './Frame';
import { NavBar } from './NavBar';
import { Menu } from './Menu';
import { HorizontalDraggable } from './HorizontalDraggable';
import { Horizontal } from './Horizontal';
import { Vertical } from './Vertical';
import { List } from './List';

export const App = () => {
  const snaplist = useRef(null);

  const [selected, select] = useState(0);
  const goTo = useScroll({ ref: snaplist });

  const goToSelected = useCallback(() => {
    goTo(selected);
  }, [goTo, selected]);

  useEffect(() => {
    goToSelected();
  }, [goToSelected]);

  useEffect(() => {
    window.addEventListener('resize', goToSelected);
    window.addEventListener('orientationchange', goToSelected);
    return () => {
      window.removeEventListener('resize', goToSelected);
      window.removeEventListener('orientationchange', goToSelected);
    };
  }, [goToSelected]);

  return (
    <Frame>
      <NavBar show={selected > 0} selected={selected} onSelect={select} />
      <SnapList direction="horizontal" ref={snaplist} disableScroll height="100%">
        <SnapItem snapAlign="start" width="100%">
          <Menu onSelect={select} />
        </SnapItem>
        <SnapItem snapAlign="start" width="100%">
          <Horizontal />
        </SnapItem>
        <SnapItem snapAlign="start" width="100%">
          <Vertical />
        </SnapItem>
        <SnapItem snapAlign="start" width="100%">
          <List />
        </SnapItem>
        <SnapItem snapAlign="start" width="100%">
          <HorizontalDraggable />
        </SnapItem>
      </SnapList>
    </Frame>
  );
};
