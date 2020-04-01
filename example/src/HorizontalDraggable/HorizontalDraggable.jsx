import React, { useRef } from 'react';

import { SnapList, SnapItem, useVisibleElements, useScroll, useDragToScroll } from 'react-snaplist-carousel';

import styles from './styles.module.css';

const Item = ({ onClick, children, visible, isDragging }) => (
  <div
    className={styles.item}
    style={{
      background: visible ? '#bce6fe' : '#cccccc',
      cursor: visible | isDragging ? 'inherit' : 'pointer',
    }}
    onClick={onClick}
  >
    {children}
  </div>
);

export const HorizontalDraggable = () => {
  const snapList = useRef(null);

  const visible = useVisibleElements({ debounce: 10, ref: snapList }, ([element]) => element);
  const goTo = useScroll({ ref: snapList });

  const isDragging = useDragToScroll(snapList);
  console.log({ isDragging });

  return (
    <div
      className={styles.wrapper}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <SnapList ref={snapList} direction="horizontal">
        <SnapItem padding={{ left: '15px', right: '15px' }} width="60%" snapAlign="center">
          <Item onClick={() => goTo(0)} visible={visible === 0} isDragging={isDragging}>
            Item 0
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '15px', right: '15px' }} width="60%" snapAlign="center">
          <Item onClick={() => goTo(1)} visible={visible === 1} isDragging={isDragging}>
            Item 1
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '15px', right: '15px' }} width="60%" snapAlign="center">
          <Item onClick={() => goTo(2)} visible={visible === 2} isDragging={isDragging}>
            Item 2
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '15px', right: '15px' }} width="60%" snapAlign="center">
          <Item onClick={() => goTo(3)} visible={visible === 3} isDragging={isDragging}>
            Item 3
          </Item>
        </SnapItem>
        <SnapItem padding={{ left: '15px', right: '15px' }} width="60%" snapAlign="center">
          <Item onClick={() => goTo(4)} visible={visible === 4} isDragging={isDragging}>
            Item 4
          </Item>
        </SnapItem>
      </SnapList>
    </div>
  );
};
