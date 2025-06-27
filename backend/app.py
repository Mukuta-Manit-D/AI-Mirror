from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torchaudio
from transformers import Wav2Vec2ForSequenceClassification, Wav2Vec2FeatureExtractor, pipeline
import os
from pydub import AudioSegment
from io import BytesIO

app = Flask(__name__)
CORS(app)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Device set to use", device)

# Load audio model
audio_model_name = "ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition"
audio_model = Wav2Vec2ForSequenceClassification.from_pretrained(audio_model_name).to(device)
feature_extractor = Wav2Vec2FeatureExtractor.from_pretrained(audio_model_name)

# Labels
emotion_labels = ['angry', 'calm', 'disgust', 'fearful', 'happy', 'neutral', 'sad', 'surprised']

@app.route("/analyze-audio", methods=["POST"])
def analyze_audio():
    file = request.files["file"]
    audio = AudioSegment.from_file(BytesIO(file.read()))
    audio = audio.set_channels(1).set_frame_rate(16000)

    # Export to temp WAV
    with BytesIO() as buffer:
        audio.export(buffer, format="wav")
        buffer.seek(0)
        waveform, sample_rate = torchaudio.load(buffer)

    inputs = feature_extractor(waveform.squeeze().numpy(), sampling_rate=16000, return_tensors="pt")
    with torch.no_grad():
        logits = audio_model(**inputs.to(device)).logits
        probs = torch.softmax(logits, dim=-1)[0]
        top3 = torch.topk(probs, 3)

    result = [{"label": emotion_labels[i], "score": float(probs[i])} for i in top3.indices]
    return jsonify({"top_emotions": result})

@app.route("/analyze-text", methods=["POST"])
def analyze_text():
    data = request.get_json()
    text = data["text"]
    classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", top_k=1)
    result = classifier(text)[0][0]
    return jsonify({"emotion": result["label"], "score": result["score"]})

if __name__ == "__main__":
    app.run(debug=True)
