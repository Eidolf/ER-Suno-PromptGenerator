from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}

def test_generate_prompt():
    res = client.post("/api/v1/generate", json={"text": "Verse content\nRefrain content"})
    assert res.status_code == 200
    data = res.json()
    assert "lyrics_formatted" in data
    assert "genres" in data
    assert "styles" in data
    assert "Verse content" in data["lyrics_formatted"]
