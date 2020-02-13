# react-snaplist-carousel

> A light, pure React, no dependencies and flexible carousel.

## Install

```bash
npm install --save react-snaplist-carousel
```

## Usage

```tsx
import * as React from 'react'

import { SnapList, SnapItem } from 'react-snaplist-carousel';

export const App = () => (
  <SnapList>
    <SnapItem paddingLeft="15px" paddingRight="15px" snapAlign="center">
      <Item />
    </SnapItem>
    <SnapItem paddingLeft="15px" paddingRight="15px" snapAlign="center">
      <Item />
    </SnapItem>
    <SnapItem paddingLeft="15px" paddingRight="15px" snapAlign="center">
      <Item />
    </SnapItem>
    <SnapItem paddingLeft="15px" paddingRight="15px" snapAlign="center">
      <Item />
    </SnapItem>
    <SnapItem paddingLeft="15px" paddingRight="15px" snapAlign="center">
      <Item />
    </SnapItem>
    <SnapItem paddingLeft="15px" paddingRight="15px" snapAlign="center">
      <Item />
    </SnapItem>
  </SnapList>
);
```

## License

MIT © [luispuig](https://github.com/luispuig)
