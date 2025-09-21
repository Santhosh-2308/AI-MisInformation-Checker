# Use official Python image
FROM python:3.11-slim

# Avoid buffering issues
ENV PYTHONUNBUFFERED=1
ENV PORT=8000

# Create working directory
WORKDIR /app

# Copy requirements first (for caching)
COPY requirements.txt .

# Upgrade pip and install dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the app
COPY . .

# Expose port for Render
EXPOSE 8000

# Run FastAPI with uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
