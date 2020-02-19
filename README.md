<img alt="react-snaplist-carousel" src="readme/snaplist.png?raw=true" width="180px" />

# react-snaplist-carousel

A modern React snaplist that can work as a carousel and much more!

- Only 7K **(3K gzipped)** size.
- Made 100% in React, no porting.
- No dependencies.
- Using native browser snap option.
- No magic, you get the control.

## Install

```bash
npm install --save react-snaplist-carousel
```

```tsx
import {
  SnapList,
  SnapItem,
  useVisibleElements,
  useScroll,
} from 'react-snaplist-carousel';
```

## Basic Example

```tsx
import * as React from 'react';

import { SnapList, SnapItem } from 'react-snaplist-carousel';

const MyItem = ({ children }) => (
  <div style={{ width: '70vw', height: 200, background: '#cccccc' }}>
    {children}
  </div>
);

export const App = () => (
  <SnapList>
    <SnapItem padding={{ left: '15px', right: '15px' }} snapAlign="center">
      <MyItem>Item 0</MyItem>
    </SnapItem>
    <SnapItem padding={{ left: '15px', right: '15px' }} snapAlign="center">
      <MyItem>Item 1</MyItem>
    </SnapItem>
    <SnapItem padding={{ left: '15px', right: '15px' }} snapAlign="center">
      <MyItem>Item 2</MyItem>
    </SnapItem>
    <SnapItem padding={{ left: '15px', right: '15px' }} snapAlign="center">
      <MyItem>Item 3</MyItem>
    </SnapItem>
    <SnapItem padding={{ left: '15px', right: '15px' }} snapAlign="center">
      <MyItem>Item 4</MyItem>
    </SnapItem>
  </SnapList>
);
```

## Advanced Example

```tsx
import React, { useRef } from 'react';

import {
  SnapList,
  SnapItem,
  useVisibleElements,
  useScroll,
} from 'react-snaplist-carousel';

const MyItem = ({ onClick, children, visible }) => (
  <div
    style={{
      width: '60vw',
      height: 200,
      background: visible ? '#bce6fe' : '#cccccc',
      cursor: visible ? 'default' : 'pointer',
    }}
    onClick={onClick}
  >
    {children}
  </div>
);

export const App = () => {
  const snapList = useRef(null);

  const visible = useVisibleElements(
    { debounce: 10, ref: snapList },
    ([element]) => element,
  );
  const goTo = useScroll({ ref: snapList });

  return (
    <SnapList ref={snapList}>
      <SnapItem padding={{ left: '20vw', right: '15px' }} snapAlign="center">
        <MyItem onClick={() => goTo(0)} visible={visible === 0}>
          Item 0
        </MyItem>
      </SnapItem>
      <SnapItem padding={{ left: '15px', right: '15px' }} snapAlign="center">
        <MyItem onClick={() => goTo(1)} visible={visible === 1}>
          Item 1
        </MyItem>
      </SnapItem>
      <SnapItem padding={{ left: '15px', right: '15px' }} snapAlign="center">
        <MyItem onClick={() => goTo(2)} visible={visible === 2}>
          Item 2
        </MyItem>
      </SnapItem>
      <SnapItem padding={{ left: '15px', right: '15px' }} snapAlign="center">
        <MyItem onClick={() => goTo(3)} visible={visible === 3}>
          Item 3
        </MyItem>
      </SnapItem>
      <SnapItem padding={{ left: '15px', right: '20vw' }} snapAlign="center">
        <MyItem onClick={() => goTo(4)} visible={visible === 4}>
          Item 4
        </MyItem>
      </SnapItem>
    </SnapList>
  );
};
```

## License

MIT © [luispuig](https://github.com/luispuig)
