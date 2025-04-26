'use client';

import React, { useState, useRef, useEffect } from 'react';
import Waveform from './Waveform';
import toast from 'react-hot-toast';

type Recording = {
  blob: Blob;
  url: string;
  timestamp: string;
};

export default function Recorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('echoverse-recordings');
    if (saved) setRecordings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('echoverse-recordings', JSON.stringify(recordings));
  }, [recordings]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunks.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toLocaleString();
        setRecordings((prev) => [...prev, { blob, url, timestamp }]);
        stream.getTracks().forEach(track => track.stop());
        toast.success('Recording saved');
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success('Recording started');
    } catch (err) {
      toast.error('Microphone permission denied');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const deleteRecording = (url: string) => {
    const updated = recordings.filter(r => r.url !== url);
    setRecordings(updated);
    localStorage.setItem('echoverse-recordings', JSON.stringify(updated));
    toast.success('Recording deleted');
  };

  return (
    <div className="text-center space-y-6">
      <h2 className="text-xl font-medium">
        {isRecording ? 'Recording...' : 'Tap to Start Recording'}
      </h2>

      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all ${
          isRecording ? 'bg-red-500 animate-pulse' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isRecording ? 'Stop' : 'Start'}
      </button>

      {isRecording && <Waveform />}

      <div className="mt-8 space-y-4">
        {recordings.length > 0 ? (
          recordings.map((rec, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-white/10 p-3 rounded-xl shadow-md"
            >
              <div className="flex flex-col items-start">
                <span className="text-sm text-white/80">Recording {i + 1}</span>
                <span className="text-xs text-white/50">{rec.timestamp}</span>
              </div>
              <audio controls src={rec.url} className="mx-4" />
              <button
                onClick={() => deleteRecording(rec.url)}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-white/50 text-sm">No recordings yet</p>
        )}
      </div>
    </div>
  );
}
