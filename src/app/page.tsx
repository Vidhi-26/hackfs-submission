"use client";

import React, { useState } from 'react';
import App from './app';
import styles from './page.module.css';

export default function Home() {
  const [showApp, setShowApp] = useState(false);

  const handlePageClick = () => {
    setShowApp(true);
  };

  return (
    <div onClick={handlePageClick} className={styles.main}>
      {showApp && <App />}
    </div>
  );
}
