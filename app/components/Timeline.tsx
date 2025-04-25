'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Entry {
  id: string;
  url: string;
  timestamp: number;
}

export default function Timeline() {
  const [entries, setEntries] = useState<Entry[]>([]);

  const fetchEntries = async () => {
    const res = await fetch('/api/entries');
    const data = await res.json();
    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    toast('Deleted from view!', { icon: '🗑️' });
  };

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p>No entries yet. Record something!</p>
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin mt-4 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {entries.map(entry => (
        <div key={entry.id} className="p-4 border rounded shadow hover:shadow-lg transition duration-300">
          <audio controls src={entry.url} className="w-full mb-2" />
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {new Date(entry.timestamp).toLocaleString()}
            </p>
            <button onClick={() => handleDelete(entry.id)} className="text-sm text-red-500 hover:underline">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
