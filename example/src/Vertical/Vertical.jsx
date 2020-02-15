import React, { useRef } from 'react';

import { SnapList, SnapItem, useVisibleElements, useScroll } from 'react-snaplist-carousel';

const Item = ({ onClick, children, visible }) => (
  <div
    style={{
      height: '60vh',
      width: '100vw',
      background: visible ? '#bce6fe' : '#cccccc',
      cursor: visible ? 'default' : 'pointer',
    }}
    onClick={onClick}
  >
    {children}
  </div>
);

export const Vertical = () => {
  const snapList = useRef(null);

  const visible = useVisibleElements({ debounce: 10, ref: snapList }, ([element]) => element);
  const goTo = useScroll({ ref: snapList });

  return (
    <div style={{ height: '100vh' }}>
      <SnapList ref={snapList} direction="vertical">
        <SnapItem paddingTop="0" paddingBottom="1px" snapAlign="start">
          <Item onClick={() => goTo(0)} visible={visible === 0}>
            Item 0
          </Item>
        </SnapItem>
        <SnapItem paddingTop="0" paddingBottom="1px" snapAlign="start">
          <Item onClick={() => goTo(1)} visible={visible === 1}>
            Item 1
          </Item>
        </SnapItem>
        <SnapItem paddingTop="0" paddingBottom="1px" snapAlign="start">
          <Item onClick={() => goTo(2)} visible={visible === 2}>
            Item 2
          </Item>
        </SnapItem>
        <SnapItem paddingTop="0" paddingBottom="1px" snapAlign="start">
          <Item onClick={() => goTo(3)} visible={visible === 3}>
            Item 3
          </Item>
        </SnapItem>
        <SnapItem paddingTop="0" paddingBottom="40vh" snapAlign="start">
          <Item onClick={() => goTo(4)} visible={visible === 4}>
            Item 4
          </Item>
        </SnapItem>
      </SnapList>
    </div>
  );
};
