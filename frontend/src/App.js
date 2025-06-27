import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ReactMic } from 'react-mic';
import './App.css';

function App() {
  const [record, setRecord] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [audioEmotions, setAudioEmotions] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [textEmotion, setTextEmotion] = useState('');
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [loadingText, setLoadingText] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef();

  const startRecording = () => {
    setRecord(true);
    setAudioEmotions([]);
    setAudioURL('');
    setAudioBlob(null);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    // console.log('Chunk of real-time data: ', recordedBlob);
  };

  const onStop = (recordedBlob) => {
    setAudioBlob(recordedBlob.blob);
    setAudioURL(recordedBlob.blobURL);
  };

  const analyzeAudio = async () => {
    if (!audioBlob) {
      setError('Please record audio first.');
      return;
    }
    setLoadingAudio(true);
    setAudioEmotions([]);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');

      const response = await axios.post('http://127.0.0.1:5000/analyze-audio', formData);
      setAudioEmotions(response.data.top_emotions || []);
    } catch (err) {
      console.error(err);
      setError('Error analyzing audio input.');
    } finally {
      setLoadingAudio(false);
    }
  };

  const analyzeText = async () => {
    if (!textInput.trim()) {
      setError('Please enter some text.');
      return;
    }
    setLoadingText(true);
    setTextEmotion('');
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:5000/analyze-text', {
        text: textInput
      });

      setTextEmotion(response.data.emotion || '');
    } catch (err) {
      console.error(err);
      setError('Error analyzing text.');
    } finally {
      setLoadingText(false);
    }
  };

  const getEmoji = (label) => {
    const map = {
      happy: '😊',
      angry: '😠',
      sad: '😢',
      calm: '😌',
      fearful: '😨',
      disgust: '🤢',
      surprised: '😲',
      neutral: '😐',
      joy: '😁'
    };
    return map[label.toLowerCase()] || '😶';
  };

  return (
    <div className="App">
      <h1>🪞 AI Mirror: Real-Time Emotion Detection</h1>

      {/* Text Emotion Section */}
      <div className="section">
        <h2>💬 Text Emotion Detection</h2>
        <textarea
          rows="4"
          cols="50"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Type your thoughts here..."
        />
        <br />
        <button onClick={analyzeText} disabled={loadingText}>
          {loadingText ? 'Analyzing...' : 'Analyze Text'}
        </button>
        {textEmotion && (
          <div className="result">
            Detected Emotion: {getEmoji(textEmotion)} <strong>{textEmotion}</strong>
          </div>
        )}
      </div>

      <hr />

      {/* Audio Emotion Section */}
      <div className="section">
        <h2>🎤 Voice Emotion Detection</h2>
        <ReactMic
          record={record}
          className="sound-wave"
          onStop={onStop}
          onData={onData}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
        <br />
        <button onClick={startRecording} disabled={record}>Start Recording</button>
        <button onClick={stopRecording} disabled={!record}>Stop Recording</button>
        <button onClick={analyzeAudio} disabled={loadingAudio || !audioBlob}>
          {loadingAudio ? 'Analyzing...' : 'Analyze Audio'}
        </button>

        {audioURL && (
          <div className="playback">
            <h4>🔊 Playback:</h4>
            <audio ref={audioRef} controls src={audioURL}></audio>
          </div>
        )}

        {audioEmotions.length > 0 && (
          <div className="result">
            <h3>Top Emotions:</h3>
            <ul>
              {audioEmotions.map((emo, index) => (
                <li key={index}>
                  {getEmoji(emo.label)} <strong>{emo.label}</strong> - {(emo.score * 100).toFixed(1)}%
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
