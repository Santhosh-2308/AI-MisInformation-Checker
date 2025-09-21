# Use official Python image
FROM python:3.11-slim

# Set work directory
WORKDIR /app

# Copy requirements
COPY app/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY app/ ./app

# Expose port
EXPOSE 8000

# Run FastAPI server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
