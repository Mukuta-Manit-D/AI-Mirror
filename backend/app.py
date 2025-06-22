from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import torch
import torchaudio
import tempfile
import os
from pydub import AudioSegment

app = Flask(__name__)
CORS(app)

# Load models directly from Hugging Face (online mode)
audio_model_name = "superb/wav2vec2-base-superb-er"
audio_classifier = pipeline("audio-classification", model=audio_model_name)

text_classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", top_k=1)

@app.route("/analyze-text", methods=["POST"])
def analyze_text():
    try:
        data = request.get_json()
        text = data.get("text", "")

        if not text:
            return jsonify({"error": "Text input is missing."}), 400

        result = text_classifier(text)
        return jsonify({"emotion": result[0]["label"]})

    except Exception as e:
        print("Error analyzing text:", str(e))
        return jsonify({"error": "Failed to analyze text input."}), 500

@app.route("/analyze-audio", methods=["POST"])
def analyze_audio():
    try:
        if 'audio' not in request.files:
            return jsonify({"error": "No audio file uploaded."}), 400

        audio_file = request.files['audio']

        # Save to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio:
            audio_file.save(temp_audio.name)
            temp_path = temp_audio.name

        # Convert to required format using pydub
        sound = AudioSegment.from_file(temp_path)
        sound = sound.set_frame_rate(16000).set_channels(1)
        sound.export(temp_path, format="wav")

        # Load waveform
        waveform, sample_rate = torchaudio.load(temp_path)
        result = audio_classifier(waveform, sampling_rate=sample_rate)

        # Clean up temp file
        os.remove(temp_path)

        return jsonify({"emotion": result[0]["label"]})

    except Exception as e:
        print("Error analyzing audio:", str(e))
        return jsonify({"error": "Failed to analyze audio input."}), 500

if __name__ == "__main__":
    app.run(debug=True)
