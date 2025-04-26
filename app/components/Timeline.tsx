'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Recording {
  url: string;
  timestamp: string;
}

export default function Timeline() {
  const [recordings, setRecordings] = useState<Recording[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('echoverse-recordings');
      if (saved) {
        const parsed = JSON.parse(saved) as Recording[];
        setRecordings(parsed.slice(-10).reverse()); // Get latest 10
      }
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('echoverse-recordings');
      if (saved) {
        const parsed = JSON.parse(saved) as Recording[];
        setRecordings(parsed.slice(-10).reverse());
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
  
    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  

  if (recordings.length === 0) {
    return (
      <div className="text-center text-white/70">
        No recordings yet. Start recording!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recordings.map((rec, i) => (
        <div
          key={i}
          className="p-4 rounded-2xl bg-gradient-to-r from-indigo-700 to-purple-700 shadow-lg flex items-center justify-between"
        >
          <div className="flex flex-col">
            <span className="text-sm text-white/80">Recording {i + 1}</span>
            <span className="text-xs text-white/50">{rec.timestamp}</span>
          </div>
          <audio controls src={rec.url} className="h-10" />
        </div>
      ))}
      <div className="text-center mt-4">
        <Link href="/entries">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
}
