'use client';

import { useState, useRef } from 'react';
import toast from 'react-hot-toast';

export default function Recorder() {
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (e) => {
      audioChunks.current.push(e.data);
    };

    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      const formData = new FormData();
      formData.append('file', audioBlob);

      try {
        setUploading(true);
        await fetch('/api/entries', {
          method: 'POST',
          body: formData,
        });
        toast.success('Recording saved!');
      } catch (error) {
        toast.error('Failed to save recording.');
      } finally {
        setUploading(false);
      }

      audioChunks.current = [];
    };

    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {!recording ? (
        <button onClick={startRecording} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded">
          Start Recording
        </button>
      ) : (
        <button onClick={stopRecording} className="px-4 py-2 bg-red-500 hover:bg-red-600 transition text-white rounded">
          Stop Recording
        </button>
      )}

      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
      {audioUrl && <audio controls src={audioUrl} className="mt-4" />}
    </div>
  );
}
