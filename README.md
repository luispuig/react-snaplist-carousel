<img alt="react-snaplist-carousel" src="readme/snaplist.png?raw=true" width="180px" />

# react-snaplist-carousel

A modern way to do a classic thing.

- Less than **3K gzipped** size.
- Made 100% in React, no porting.
- No dependencies.
- Typescript ready.
- Uses native browser snap option.
- No magic, you get the control thanks to the hooks.

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
  const goToSnapItem = useScroll({ ref: snapList });

  return (
    <SnapList ref={snapList}>
      <SnapItem padding={{ left: '20vw', right: '15px' }} snapAlign="center">
        <MyItem onClick={() => goToSnapItem(0)} visible={visible === 0}>
          Item 0
        </MyItem>
      </SnapItem>
      <SnapItem padding={{ left: '15px', right: '15px' }} snapAlign="center">
        <MyItem onClick={() => goToSnapItem(1)} visible={visible === 1}>
          Item 1
        </MyItem>
      </SnapItem>
      <SnapItem padding={{ left: '15px', right: '15px' }} snapAlign="center">
        <MyItem onClick={() => goToSnapItem(2)} visible={visible === 2}>
          Item 2
        </MyItem>
      </SnapItem>
      <SnapItem padding={{ left: '15px', right: '15px' }} snapAlign="center">
        <MyItem onClick={() => goToSnapItem(3)} visible={visible === 3}>
          Item 3
        </MyItem>
      </SnapItem>
      <SnapItem padding={{ left: '15px', right: '20vw' }} snapAlign="center">
        <MyItem onClick={() => goToSnapItem(4)} visible={visible === 4}>
          Item 4
        </MyItem>
      </SnapItem>
    </SnapList>
  );
};
```

## Options

### SnapList

- `direction` { horizontal | vertical }: Scroll direction. \*
- `disableScroll` { boolean | undefined }: Disable the native scroll on swipe or mouse wheel.
- `ref` { React.RefObject\<HTMLDivElement\> | undefined }: The React.ref to the element required by the hooks.

\* _Required fields_

### SnapItem

- `snapAlign` { start | center | end | none }: The box’s snap position when the scroll stops. See <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align" target="_blank">scroll-snap-align</a> for more information \*
- `disableScroll` { boolean | undefined }: Avoid the scroll to "pass over" possible snap positions. See <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop" target="_blank">scroll-snap-stop</a> for more information
- `padding` { {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  } | undefined }: The padding use to set the separation between the items. You can use different padding for the first and last item for special cases.

\* _Required fields_

### useScroll

```jsx
const snapList = useRef(null);
const goToElement = useScroll({ ref: snapList });

return (
  <SnapList ref={snapList}>
    <SnapItem snapAlign="left">
      <div onClick={() => goTo(0)}>Item 0</div>
    </SnapItem>
    <SnapItem snapAlign="left">
      <div onClick={() => goTo(1)}>Item 1</div>
    </SnapItem>
  </SnapList>
);
```

Response

- A function `(element:number) => void` to scroll to the element.

Arguments

- `ref`: { React.RefObject\<HTMLDivElement\> } \*
- `duration`: { number }. Optional (default 800). This duration is used for the browsers without support of <a href="https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions/behavior" target="_blank">ScrollBehavior</a> \*

\* _Required fields_

### useVisibleElements

```jsx
const snapList = useRef(null);
const selected = useVisibleElements(
  { ref: snapList, debounce: 10 },
  elements => elements[0],
);

return (
  <SnapList ref={snapList}>
    <SnapItem snapAlign="left">
      <div
        onClick={() => goTo(0)}
        style={{
          backgroundColor: selected === 0 ? 'papayawhip' : null,
        }}
      >
        Item 0
      </div>
    </SnapItem>
    <SnapItem snapAlign="left">
      <div
        onClick={() => goTo(1)}
        style={{
          backgroundColor: selected === 1 ? 'papayawhip' : null,
        }}
      >
        Item 1
      </div>
    </SnapItem>
  </SnapList>
);
```

Arguments

- `ref`: { React.RefObject\<HTMLDivElement\> } \*
- `debounce`: { number }. Optional (default 10). The time that the scroll is stopped before firing the visible elements check.
- `selectorFunction`: { (element:number[]) => any }. This selector gets an array of the visible elements as an argument and the return value will be returned by the useVisibleElements. Use this function to add some logic like select only the first one, calculate if there hidden elements before or later, etc... \*

\* _Required fields_

Tip

Use many times `useVisibleElements` hook with different `debounce` values for different purposes. For instance with a SnapList to select one option, one with debounce 10 for the slider dots animation or the selected option background and another one with debounce 100 to fire a select sideEffect.

## License

MIT © [luispuig](https://github.com/luispuig)
