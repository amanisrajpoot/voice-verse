'use client';

import React, { useState, useRef } from 'react';
import Loader from './Loader';
import { toast } from 'react-hot-toast';
import Waveform from './Waveform';

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);
      mediaRecorder.onstop = async () => {
        setIsLoading(true);
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

        // Upload
        const formData = new FormData();
        formData.append('audio', audioBlob);
        const res = await fetch('/api/process-audio', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        setIsLoading(false);
        toast.success('Processing complete!');
        console.log(data);
      };

      mediaRecorder.start();
      toast.success('Recording started...');
    } catch (err) {
      toast.error('Error accessing mic');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    toast.success('Recording stopped.');
  };

  return (
    <div className="text-center space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Echoverse</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-6 py-3 rounded-xl text-lg font-semibold transition duration-300 ease-in-out ${
            isRecording
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      	{isRecording && <Waveform />}
      )}
    </div>
  );
};

export default Recorder;
