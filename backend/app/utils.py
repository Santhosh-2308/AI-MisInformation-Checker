import wikipediaapi

wiki_wiki = wikipediaapi.Wikipedia(
    language='en',
    user_agent='ai-misinformation-detector/1.0 (santhoshkandsgatla786@example.com)'
)

def fetch_wikipedia_snippets(query: str, max_sentences=3):
    page = wiki_wiki.page(query)
    if not page.exists():
        return []
    text = page.text
    # Return first few sentences as snippets
    sentences = text.split('. ')
    snippets = [s.strip() + '.' for s in sentences[:max_sentences]]
    return snippets