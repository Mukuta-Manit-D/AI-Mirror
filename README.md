<p align="center">
  <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg" width="40" />
  <img src="https://img.shields.io/badge/AI%20Mirror-Emotion%20Recognition-blueviolet?style=flat-square" />
  <img src="https://img.shields.io/badge/Made%20with-React-blue?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Backend-Flask-lightgrey?style=flat-square&logo=flask" />
</p>

# 🪞 AI Mirror: Real-Time Emotion Analyzer

**AI Mirror** is an AI-powered application that detects human emotions through **voice recordings** and **text inputs** in real time. It uses state-of-the-art transformer models to analyze emotional tone and gives instant feedback.

---

## ✨ Features

- 🎤 **Voice Emotion Detection**
  - Record audio using the browser
  - Analyze emotional tone using pre-trained models like `wav2vec2`
- 💬 **Text Emotion Detection**
  - Type any message and get its emotional sentiment
- 🔊 Audio playback support for recorded clips
- ⚡ Smooth, responsive UI with real-time waveforms
- 🚀 Powered by HuggingFace transformers & deep learning

---

## 📸 Screenshots

> Replace these with your own project screenshots

### 🎙 Voice Emotion Detection
<img src="https://i.imgur.com/Bl1wMxo.png" width="600"/>

### ✍️ Text Emotion Detection
<img src="https://i.imgur.com/wuDzuzr.png" width="600"/>

---

## 🛠 Tech Stack

| Frontend     | Backend     | ML Models         |
|--------------|-------------|-------------------|
| React.js     | Flask (Python) | wav2vec2 (HuggingFace) |
| react-mic    | Flask-CORS  | DistilBERT        |
| axios        | torchaudio  | Custom Transformers |

---

## 🧑‍💻 Local Setup

### 1. Clone this repository
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

###3. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```
###
