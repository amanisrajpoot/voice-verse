'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Recording {
  blob: Blob;
  url: string;
  timestamp: string;
}

export default function Timeline() {
  const [recordings, setRecordings] = useState<Recording[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('echoverse-recordings');
    if (saved) {
      setRecordings(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (url: string) => {
    const updatedRecordings = recordings.filter(rec => rec.url !== url);
    setRecordings(updatedRecordings);
    localStorage.setItem('echoverse-recordings', JSON.stringify(updatedRecordings));
    toast.success('Recording deleted');
  };

  if (recordings.length === 0) {
    return (
      <div className="flex flex-col items-center pt-10">
        <p className="text-white/70 mb-4">No recordings yet. Go record something!</p>
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {recordings.map((rec, index) => (
        <div
          key={index}
          className="p-4 border border-white/10 rounded-xl bg-white/5 shadow-md hover:shadow-lg transition duration-300"
        >
          <audio controls src={rec.url} className="w-full rounded mb-2" />
          <div className="flex justify-between items-center text-sm text-white/70">
            <span>{rec.timestamp}</span>
            <button
              onClick={() => handleDelete(rec.url)}
              className="text-red-400 hover:text-red-300 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
