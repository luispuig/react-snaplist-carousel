import React, { useRef, useEffect, useCallback, useState } from 'react';
import { SnapList, SnapItem, useScroll } from 'react-snaplist-carousel';
import { mergeStyles } from './utils';
import { Horizontal } from './Horizontal';
import { Vertical } from './Vertical';

import logo from './Menu/snaplist.png';
import styles from './App.module.css';

const Example = ({ children, selected }) => (
  <div className={mergeStyles(styles.fullScreen, !selected ? styles.fullScreenNoSelected : null)}>{children}</div>
);
Example.NavBar = ({ children }) => <div className={styles.topBar}>{children}</div>;
Example.NavBar.Item = ({ children, onClick }) => (
  <div onClick={() => onClick()} className={mergeStyles(styles.link, styles.topBarItem)}>
    {children}
  </div>
);
Example.Content = ({ children }) => <div className={styles.content}>{children}</div>;

const MenuItem = ({ onClick }) => <Example.NavBar.Item onClick={onClick}>Menu</Example.NavBar.Item>;

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
    <div className={styles.fullScreen}>
      <SnapList direction="vertical" ref={snaplist} disableScroll>
        <SnapItem snapAlign="start">
          <Example selected={selected === 0}>
            <Example.Content>
              <div className={styles.menu}>
                <div align="center">
                  <img src={logo} alt="react-snaplist-carousel" width="120px" />
                  <br />
                  <b>snaplist</b>
                  <p>&nbsp;</p>
                </div>
                Examples
                <ul>
                  <li className={mergeStyles(styles.link, styles.menuOption)} onClick={() => select(1)}>
                    Horizontal
                  </li>
                  <li className={mergeStyles(styles.link, styles.menuOption)} onClick={() => select(2)}>
                    Vertical
                  </li>
                </ul>
              </div>
            </Example.Content>
          </Example>
        </SnapItem>
        <SnapItem snapAlign="start">
          <Example selected={selected === 1}>
            <Example.NavBar>
              <MenuItem onClick={() => select(0)} />
              <Example.NavBar.Item onClick={() => select(2)}>Next</Example.NavBar.Item>
            </Example.NavBar>
            <Example.Content>
              <Horizontal />
            </Example.Content>
          </Example>
        </SnapItem>
        <SnapItem snapAlign="start">
          <Example selected={selected === 2}>
            <Example.NavBar>
              <MenuItem onClick={() => select(0)} />
              <Example.NavBar.Item onClick={() => select(1)}>Previous</Example.NavBar.Item>
            </Example.NavBar>
            <Example.Content>
              <Vertical />
            </Example.Content>
          </Example>
        </SnapItem>
      </SnapList>
    </div>
  );
};
