import React, { useRef, useEffect, useCallback, useState } from 'react';
import { SnapList, SnapItem, useScroll } from 'react-snaplist-carousel';
import { mergeStyles } from './utils';
import { Frame } from './Frame';
import { Menu } from './Menu';
import { Horizontal } from './Horizontal';
import { Vertical } from './Vertical';

import styles from './App.module.css';

const NavBar = ({ children }) => <div className={styles.topBar}>{children}</div>;
NavBar.Item = ({ children, onClick }) => (
  <div onClick={() => onClick()} className={mergeStyles(styles.link, styles.topBarItem)}>
    {children}
  </div>
);
const MenuItem = ({ onClick }) => <NavBar.Item onClick={onClick}>Menu</NavBar.Item>;

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
      <NavBar>
        <MenuItem onClick={() => select(0)} />
        <NavBar.Item onClick={() => select(Math.max(0, selected - 1))}>Previous</NavBar.Item>
        <NavBar.Item onClick={() => select(2, Math.min(selected + 1))}>Next</NavBar.Item>
      </NavBar>
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
      </SnapList>
    </Frame>
  );
};
