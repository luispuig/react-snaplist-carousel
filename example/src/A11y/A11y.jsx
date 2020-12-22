import React, { useRef } from 'react';

import { SnapList, SnapItem, useVisibleElements, useScroll, useDragToScroll } from 'react-snaplist-carousel';

import styles from './styles.module.css';

const Item = ({ onClick, children, visible, ...props }) => (
  <div
    className={styles.item}
    style={{
      background: visible ? '#bce6fe' : '#cccccc',
      cursor: visible ? 'default' : 'pointer',
    }}
    onClick={onClick}
    {...props}
  >
    {children}
  </div>
);

const itemWidth = 100;

const List = ({ id }) => {
  const snapList = useRef(null);
  const snapItem14 = useRef(null);

  const visible = useVisibleElements({ debounce: 10, ref: snapList }, (elements, elementInCenter) => elementInCenter);
  const goToChildren = useScroll({ ref: snapList });
  useDragToScroll({ ref: snapList });

  return (
    <div className={styles.wrapper} id="list">
      <SnapList
        ref={snapList}
        direction="horizontal"
        height="auto"
        tabIndex={0}
        role="region"
        aria-label={`my list number ${id}`}
      >
        <SnapItem margin={{ left: `calc(50% - (${itemWidth}px/2)`, right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(0)} visible={visible === 0} tabIndex={0}>
            Item 0<br />
            <button
              onClick={() => {
                goToChildren(14);
                snapItem14.current && snapItem14.current.focus();
              }}
            >
              go to last
            </button>
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(1)} visible={visible === 1}>
            Item 1
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(2)} visible={visible === 2}>
            Item 2
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(3)} visible={visible === 3}>
            Item 3
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(4)} visible={visible === 4}>
            Item 4
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(5)} visible={visible === 5}>
            Item 5
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(6)} visible={visible === 6}>
            Item 6
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(7)} visible={visible === 7}>
            Item 7
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(8)} visible={visible === 8}>
            Item 8
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(9)} visible={visible === 9}>
            Item 9
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(10)} visible={visible === 10}>
            Item 10
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(11)} visible={visible === 11}>
            Item 11
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(12)} visible={visible === 12}>
            Item 12
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(13)} visible={visible === 13}>
            Item 13
          </Item>
        </SnapItem>
        <SnapItem
          ref={snapItem14}
          tabIndex={-1}
          margin={{ left: '10px', right: `calc(50% - (${itemWidth}px/2)` }}
          snapAlign="center"
        >
          <Item onClick={() => goToChildren(14)} visible={visible === 14}>
            Item 14
          </Item>
        </SnapItem>
      </SnapList>
    </div>
  );
};

export const A11y = () => {
  return (
    <div className={styles.listsWrapper}>
      <List id={1} />
      <List id={2} />
      <p className={styles.instructions}>
        <ul className={styles.instructionsList}>
          <li>Each top level SnapItem element is focusable.</li>
          <li>Item 0 is also focusable.</li>
          <li>When clicking the "go to last" button, carousel goes to last item and automatically focuses it.</li>
          <li>
            Last item is focusable via script and mouse click, but no keyboard reachable as it has no interactive
            elements.
          </li>
          <li>
            When a list has focus (either SnapList parent or any child), it can be scrolled through keybaord arrow
            keys).
          </li>
        </ul>
      </p>
    </div>
  );
};
