import requests
from bs4 import BeautifulSoup

def scrape_text_from_url(url):
    headers = {
        "User-Agent": "ai-misinformation-detector/1.0"
    }
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
            return ""
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Extract text from <p> tags
        paragraphs = soup.find_all("p")
        text = " ".join([p.get_text() for p in paragraphs])
        return text.strip()
    except Exception as e:
        print("Scraping error:", e)
        return ""
