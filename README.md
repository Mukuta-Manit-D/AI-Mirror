<p align="center">
  <img src="images/mirror.jpg" alt="AI Mirror Logo"/>
</p>

<h1 align="center">🪞 AI Mirror: Real-Time Emotion Analyzer</h1>

<p align="center">
  <b>Voice and text-based emotion detection powered by AI</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Emotion%20Recognition-AI%20Mirror-blueviolet?style=flat-square&logo=ai" />
  <img src="https://img.shields.io/badge/Made%20With-React-blue?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Backend-Flask-lightgrey?style=flat-square&logo=flask" />
  <img src="https://img.shields.io/badge/Model-wav2vec2-yellow?style=flat-square&logo=huggingface" />
</p>

---

## 🔍 Overview

> AI Mirror is an AI-powered emotion analysis app that listens to your **voice** or reads your **text**, and instantly reflects your emotional state using advanced deep learning models. 

---

## 🎯 Features

- 🎤 **Voice Emotion Detection**
  - Real-time recording with waveform display
  - In-browser audio analysis via `wav2vec2` from HuggingFace
- 💬 **Text Emotion Detection**
  - Analyze emotional tone of any typed message
- 🔁 **Playback Functionality**
  - Listen to your recorded message before submission
- ⚡ **Live Feedback UI**
  - Beautiful React interface with waveform animation

---

## 🖼️ Screenshots

### 🎙 Voice Analysis
<p align="center">
  <img src="https://i.imgur.com/Bl1wMxo.png" width="600" alt="Voice Emotion Detection Screenshot"/>
</p>

### 💬 Text Emotion Detection
<p align="center">
  <img src="https://i.imgur.com/wuDzuzr.png" width="600" alt="Text Emotion Detection Screenshot"/>
</p>

---

## 🧰 Tech Stack

| Frontend | Backend | Models |
|----------|---------|--------|
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="30"/> React.js | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" width="30"/> Flask | 🤖 `wav2vec2` |
| 🎙 `react-mic` | 🔁 `Flask-CORS` | ✍️ `DistilBERT` |
| ⚡ `axios` | 🔊 `torchaudio`, `pydub` | 🧠 HuggingFace Transformers |

---

## ⚙️ Setup Instructions

### 🔃 Clone the Repo
```bash
git clone https://github.com/yourusername/ai-mirror.git
cd ai-mirror
```

### 2. Backend Directory
```bash
cd backend
python -m venv env
env\Scripts\activate   # On Windows
pip install -r requirements.txt
python app.py
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```
###
