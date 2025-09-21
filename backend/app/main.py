# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from typing import Optional, List

# --- Lazy import for heavy modules ---
detector = None

def get_detector():
    global detector
    if detector is None:
        from app.model import MisinformationDetector
        detector = MisinformationDetector()
    return detector

from app.scraper import scrape_text_from_url
from app.utils import fetch_wikipedia_snippets

# --- FastAPI app ---
app = FastAPI(title="AI-Powered Misinformation Detector")

# CORS for frontend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "AI-Powered Misinformation Detector is running!"}

# --- Request/Response models ---
class PredictRequest(BaseModel):
    text: Optional[str] = None
    url: Optional[HttpUrl] = None

class PredictResponse(BaseModel):
    label: str
    confidence: float
    explanation: str
    tips: List[str]
    wiki_matches: List[str]

# --- Predict endpoint ---
@app.post("/predict", response_model=PredictResponse)
async def predict(data: PredictRequest):
    content = ""
    if data.url:
        content = scrape_text_from_url(data.url)
        if not content:
            raise HTTPException(status_code=400, detail="Failed to extract content from URL.")
    elif data.text:
        content = data.text.strip()
    else:
        raise HTTPException(status_code=400, detail="Either text or url must be provided.")

    # Lazy-load ML model
    detector_instance = get_detector()
    label, confidence = detector_instance.predict(content)

    explanation = {
        "Likely True": "The content appears to be credible based on AI analysis.",
        "Likely False": "The content shows signs of misinformation or falsehood.",
        "Uncertain": "The AI model is uncertain about the veracity of the content."
    }.get(label, "No explanation available.")

    tips = [
        "Check the source of the information.",
        "Look for supporting evidence from multiple reliable sources.",
        "Be cautious of sensational or emotionally charged language.",
        "Verify facts using trusted fact-checking websites."
    ]

    # Simple wiki keyword heuristic
    keywords = " ".join(content.split()[:5])
    wiki_matches = fetch_wikipedia_snippets(keywords)

    return PredictResponse(
        label=label,
        confidence=round(confidence, 3),
        explanation=explanation,
        tips=tips,
        wiki_matches=wiki_matches
    )

# --- Run server ---
if __name__ == "__main__":
    import os
    import uvicorn

    port = int(os.environ.get("PORT", 8000))  # Dynamic port for Render/Vercel
    uvicorn.run("main:app", host="0.0.0.0", port=port, log_level="info")
