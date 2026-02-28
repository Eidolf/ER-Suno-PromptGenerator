from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}

def test_generate_prompt():
    res = client.post("/api/v1/generate", json={"text": "Verse content\\nRefrain content"})
    assert res.status_code == 200
    data = res.json()
    assert "[Verse 1]" in data["lyrics_formatted"]
    assert "[Refrain]" in data["lyrics_formatted"]
