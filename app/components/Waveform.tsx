'use client';

import React, { useEffect, useState } from 'react';
import './Waveform.css';

const Waveform = () => {
  const [bars, setBars] = useState<number[]>(new Array(30).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(bars => bars.map(() => Math.random()));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="waveform-container">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="bar"
          style={{ height: `${bar * 100}%` }}
        />
      ))}
    </div>
  );
};

export default Waveform;
