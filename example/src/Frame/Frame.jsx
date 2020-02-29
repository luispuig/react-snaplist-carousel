import React from 'react';

import styles from './styles.module.css';

export const Frame = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
