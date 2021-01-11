import React from 'react';
import logo from './snaplist.png';
import github from './strip-github.png';
import vertical from './vertical.gif';
import horizontal from './horizontal.gif';
import list from './list.gif';

import styles from './styles.module.css';

export const Menu = ({ onSelect }) => {
  return (
    <div className={styles.menu}>
      <a
        className={styles.github}
        href="https://github.com/luispuig/react-snaplist-carousel"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img src={github} alt="fork-me-on-github" width="120px" />
      </a>
      <div className={styles.header}>
        <img src={logo} alt="react-snaplist-carousel" width="100px" />
        <br />
        <b>snaplist</b>
      </div>
      A modern way to do a classic thing.
      <ul>
        <li>Less than **3K gzipped** size.</li>
        <li>Made 100% in React, no porting.</li>
        <li>No dependencies.</li>
        <li>Typescript ready.</li>
        <li>Using it in production.</li>
        <li>Uses native browser snap option.</li>
        <li>No magic, you get the control thanks to the hooks.</li>
      </ul>
      <b>Examples</b>
      <div className={styles.examples}>
        <div className={styles.example}>
          <img
            src={horizontal}
            alt="horizontal-example"
            width="100%"
            onClick={() => onSelect(1)}
            tabIndex={0}
            role="button"
            onKeyDown={e => {
              if (['Enter', ' '].includes(e.key)) {
                e.preventDefault();
                onSelect(1);
              }
            }}
          />
          <div className={styles.exampleTitle}>Horizontal</div>
        </div>
        <div className={styles.example}>
          <img
            src={vertical}
            alt="vertical-example"
            width="100%"
            onClick={() => onSelect(2)}
            tabIndex={0}
            role="button"
            onKeyDown={e => {
              if (['Enter', ' '].includes(e.key)) {
                e.preventDefault();
                onSelect(2);
              }
            }}
          />
          <div className={styles.exampleTitle}>Vertical</div>
        </div>
        <div className={styles.example}>
          <img
            src={list}
            alt="list-example"
            width="100%"
            onClick={() => onSelect(3)}
            tabIndex={0}
            role="button"
            onKeyDown={e => {
              if (['Enter', ' '].includes(e.key)) {
                e.preventDefault();
                onSelect(3);
              }
            }}
          />
          <div className={styles.exampleTitle}>List</div>
        </div>
        <div className={styles.example}>
          <img
            src={list}
            alt="accessibility-example"
            width="100%"
            onClick={() => onSelect(4)}
            tabIndex={0}
            role="button"
            onKeyDown={e => {
              if (['Enter', ' '].includes(e.key)) {
                e.preventDefault();
                onSelect(4);
              }
            }}
          />
          <div className={styles.exampleTitle}>A11y</div>
        </div>
      </div>
    </div>
  );
};
