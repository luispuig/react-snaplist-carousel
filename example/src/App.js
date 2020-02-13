import React from 'react';

import { SnapList, SnapItem } from 'react-snaplist-carousel';

const Item = () => <div style={{ width: '70vw', height: 200, background: '#cccccc' }}>ITEM</div>;

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
