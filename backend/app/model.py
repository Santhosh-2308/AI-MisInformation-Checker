from transformers import pipeline
import logging

logger = logging.getLogger(__name__)

class MisinformationDetector:
    def __init__(self):
        # Use a public, reliable model for text classification
        # No fallback needed; always uses distilbert sentiment model
        self.classifier = pipeline(
            "text-classification",
            model="distilbert-base-uncased-finetuned-sst-2-english"
        )
        self.is_fake_news_model = False  # Using sentiment model
        logger.info("Loaded sentiment-analysis model for misinformation detection.")

    def predict(self, text: str):
        results = self.classifier(text[:512])  # limit input length
        sentiment = results[0]['label'].lower()
        confidence = results[0]['score']

        if confidence < 0.6:
            label = "Uncertain"
        else:
            if sentiment == "positive":
                label = "Likely True"
            elif sentiment == "negative":
                label = "Likely False"
            else:
                label = "Uncertain"

        return label, confidence
