import React, { useRef } from 'react';

import { SnapList, SnapItem, useVisibleElements, useScroll, useDragToScroll } from 'react-snaplist-carousel';

import styles from './styles.module.css';

const Item = ({ onClick, children, visible }) => (
  <div
    className={styles.item}
    style={{
      background: visible ? '#bce6fe' : '#cccccc',
      cursor: visible ? 'default' : 'pointer',
    }}
    onClick={onClick}
  >
    {children}
  </div>
);

export const List = () => {
  const snapList = useRef(null);

  const visible = useVisibleElements({ debounce: 10, ref: snapList }, (elements, elementInCenter) => elementInCenter);
  const goToChildren = useScroll({ ref: snapList });
  useDragToScroll({ ref: snapList });

  return (
    <div className={styles.wrapper}>
      <SnapList ref={snapList} direction="horizontal" height="auto">
        <SnapItem padding={{ left: 'calc(50% - (100px/2)', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(0)} visible={visible === 0}>
            Item 0
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(1)} visible={visible === 1}>
            Item 1
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(2)} visible={visible === 2}>
            Item 2
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(3)} visible={visible === 3}>
            Item 3
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(4)} visible={visible === 4}>
            Item 4
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(5)} visible={visible === 5}>
            Item 5
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(6)} visible={visible === 6}>
            Item 6
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(7)} visible={visible === 7}>
            Item 7
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '10px', right: '10px' }} snapAlign="end">
          <Item onClick={() => goToChildren(8)} visible={visible === 8}>
            Item 8
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(9)} visible={visible === 9}>
            Item 9
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(10)} visible={visible === 10}>
            Item 10
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(11)} visible={visible === 11}>
            Item 11
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(12)} visible={visible === 12}>
            Item 12
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '10px', right: '10px' }} snapAlign="center">
          <Item onClick={() => goToChildren(13)} visible={visible === 13}>
            Item 13
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '10px', right: 'calc(50% - (100px/2)' }} snapAlign="center">
          <Item onClick={() => goToChildren(14)} visible={visible === 14}>
            Item 14
          </Item>
        </SnapItem>
      </SnapList>
    </div>
  );
};
