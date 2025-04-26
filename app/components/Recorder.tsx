'use client';

import React, { useState, useRef, useEffect } from 'react';
import Waveform from './Waveform';
import toast from 'react-hot-toast';

type Recording = {
  blob: Blob;
  url: string;
  timestamp: string;
  name: string; // <-- Added
};

export default function Recorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [mounted, setMounted] = useState(false);
  const [editingNameIndex, setEditingNameIndex] = useState<number | null>(null);
  const [editingName, setEditingName] = useState<string>('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const mimeTypeRef = useRef<string>('audio/webm');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const saved = localStorage.getItem('echoverse-recordings');
      if (saved) setRecordings(JSON.parse(saved));
    }
  }, [mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('echoverse-recordings', JSON.stringify(recordings));
    }
  }, [recordings, mounted]);

  const generateMelodyName = () => {
    const adjectives = ['Melody', 'Rhythm', 'Harmony', 'Echo', 'Vibe', 'Tune', 'Chime', 'Chord', 'Beat', 'Serenade'];
    const nouns = ['Spark', 'Whisper', 'Dream', 'Pulse', 'Waltz', 'Storm', 'Drift', 'Glow', 'Shimmer', 'Flow'];

    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);

    return `${randomAdj}-${randomNoun}-${timestamp}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeTypeRef.current = 'audio/mp4';
      } else if (MediaRecorder.isTypeSupported('audio/mpeg')) {
        mimeTypeRef.current = 'audio/mpeg';
      } else {
        mimeTypeRef.current = 'audio/webm';
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType: mimeTypeRef.current });
      mediaRecorderRef.current = mediaRecorder;
      chunks.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks.current, { type: mimeTypeRef.current });
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
        const name = generateMelodyName();

        setRecordings((prev) => [...prev, { blob, url, timestamp, name }]);

        stream.getTracks().forEach(track => track.stop());

        try {
          const formData = new FormData();
          formData.append('file', blob);
          await fetch('/api/entries', {
            method: 'POST',
            body: formData,
          });
        } catch (error) {
          console.error('Failed to save entry to server', error);
        }

        toast.success('Recording saved');
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success('Recording started', { icon: '🎙️' });
    } catch (err) {
      toast.error('Microphone permission denied', { icon: '🚫' });
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const deleteRecording = (url: string) => {
    setRecordings(prev => prev.filter(r => r.url !== url));
    toast('Deleted successfully!', { icon: '🗑️' });
  };

  if (!mounted) return null;

  return (
    <div className="text-center space-y-6">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${
          isRecording 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
            : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isRecording ? 'Stop' : 'Start'}
      </button>

      {isRecording && <Waveform />}

      <h3 className="text-sm font-semibold text-white">Recent Recordings</h3>

      {recordings.length > 0 ? (
        recordings
          .slice(-5)
          .reverse()
          .map((rec, i) => (
            <div
              key={i}
              className="flex items-center bg-white/10 p-4 rounded-2xl shadow-md space-x-6"
            >
              {/* Serial No. */}
              <span className="text-base font-semibold text-white w-6 text-center">{i + 1}.</span>

              {/* Audio Player */}
              <audio
                controls
                src={rec.url}
                className="flex-1 h-10 rounded-md bg-white/20 backdrop-blur-sm"
              />

              {/* Name and Delete together */}
              <div className="flex flex-col items-end space-y-2">
                {editingNameIndex === i ? (
                  <input
                    value={editingName}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 30) {
                        setEditingName(value);
                      }
                    }}
                    onBlur={() => {
                      const updated = [...recordings];
                      updated[i].name = editingName.trim() || updated[i].name;
                      setRecordings(updated);
                      setEditingNameIndex(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const updated = [...recordings];
                        updated[i].name = editingName.trim() || updated[i].name;
                        setRecordings(updated);
                        setEditingNameIndex(null);
                      }
                    }}
                    className="text-xs text-white font-semibold bg-white/10 p-1 rounded-md w-40 text-center"
                    autoFocus
                  />
                ) : (
                  <span
                    onClick={() => {
                      setEditingNameIndex(i);
                      setEditingName(rec.name);
                    }}
                    className="text-xs text-white font-semibold cursor-pointer hover:underline text-center w-40 truncate"
                  >
                    {rec.name}
                  </span>
                )}

                <button
                  onClick={() => deleteRecording(rec.url)}
                  className="text-red-400 hover:text-red-300 text-xs font-semibold px-3 py-1 border border-red-400 rounded-md hover:bg-red-400/10 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
      ) : (
        <p className="text-white/50 text-sm">No recordings yet</p>
      )}
    </div>
  );
}
