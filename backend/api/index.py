from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "AI Misinformation Backend running"}

@app.get("/predict")
def predict():
    return {"result": "This is a test endpoint"}
