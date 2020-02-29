import React from 'react';
import { mergeStyles } from '../utils';
import { ReactComponent as Menu } from './dots.svg';
import { ReactComponent as ForwardArrow } from './forward-arrow.svg';
import { ReactComponent as BackwardArrow } from './back-arrow.svg';

import styles from './styles.module.css';

const Item = ({ children, onClick }) => (
  <div onClick={() => onClick()} className={mergeStyles(styles.link, styles.topBarItem)}>
    {children}
  </div>
);

export const NavBar = ({ show, onSelect, selected }) => (
  <div className={mergeStyles(styles.topBar, !show ? styles.topBar_hidden : null)}>
    <div className={styles.left}>
      <Item onClick={() => onSelect(0)}>
        <Menu className={styles.menuIcon} />
      </Item>
    </div>
    <div className={styles.right}>
      <Item onClick={() => onSelect(Math.max(0, selected - 1))}>
        <BackwardArrow className={styles.arrowIcon} />
      </Item>
      <Item onClick={() => onSelect(2, Math.min(selected + 1))}>
        <ForwardArrow className={styles.arrowIcon}/>
      </Item>
    </div>
  </div>
);
