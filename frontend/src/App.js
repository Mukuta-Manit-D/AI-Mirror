import React, { useState, useRef } from 'react';
import { ReactMic } from 'react-mic';
import axios from 'axios';

function App() {
  const [record, setRecord] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [audioEmotion, setAudioEmotion] = useState('');
  const [textEmotion, setTextEmotion] = useState('');
  const [textInput, setTextInput] = useState('');
  const audioRef = useRef(null);

  const startRecording = () => {
    setRecord(true);
    setAudioEmotion('');
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onStop = (recordedBlob) => {
    setAudioBlob(recordedBlob.blob);
    setAudioURL(recordedBlob.blobURL);
  };

  const analyzeAudio = async () => {
    if (!audioBlob) return alert('No audio recorded!');
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    try {
      const response = await axios.post('http://127.0.0.1:5000/analyze-audio', formData);
      setAudioEmotion(response.data.emotion);
    } catch (err) {
      console.error('Audio Analysis Error:', err);
      alert('Error analyzing audio.');
    }
  };

  const analyzeText = async () => {
    if (!textInput.trim()) return alert('Enter text to analyze.');
    try {
      const response = await axios.post('http://127.0.0.1:5000/analyze-text', {
        text: textInput,
      });
      setTextEmotion(response.data.emotion);
    } catch (err) {
      console.error('Text Analysis Error:', err);
      alert('Error analyzing text.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: 30 }}>
      <h1>🧠 AI Mirror: Real-Time Emotion Analyzer</h1>

      {/* 🎙️ Audio Section */}
      <section style={{ marginBottom: 40 }}>
        <h2>🎤 Voice Emotion Detection</h2>
        <ReactMic
          record={record}
          className="sound-wave"
          onStop={onStop}
          strokeColor="#000000"
          backgroundColor="#FF4081"
          mimeType="audio/webm"
        />
        <br />
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording} style={{ marginLeft: 10 }}>Stop</button>
        <button onClick={analyzeAudio} style={{ marginLeft: 10 }}>Analyze Audio</button>
        <br /><br />
        {audioURL && (
          <audio ref={audioRef} controls src={audioURL} />
        )}
        {audioEmotion && (
          <p><strong>Detected Emotion (Voice):</strong> {audioEmotion}</p>
        )}
      </section>

      {/* 💬 Text Section */}
      <section>
        <h2>✍️ Text Emotion Detection</h2>
        <textarea
          rows={4}
          cols={50}
          placeholder="Type your message here..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <br />
        <button onClick={analyzeText}>Analyze Text</button>
        <br /><br />
        {textEmotion && (
          <p><strong>Detected Emotion (Text):</strong> {textEmotion}</p>
        )}
      </section>
    </div>
  );
}

export default App;
