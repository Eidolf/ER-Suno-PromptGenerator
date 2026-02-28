from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class PromptRequest(BaseModel):
    text: str
    genres: List[str] = []

class PromptResponse(BaseModel):
    genres: str
    styles: str
    lyrics_formatted: str

@router.post("/generate", response_model=PromptResponse)
def generate_prompt(req: PromptRequest):
    # Domain logic placeholder
    # rough recognition of strophes and refrain
    lines = req.text.split("\n")
    formatted = []
    
    for line in lines:
        if line.strip():
            formatted.append(line.strip())
            
    return PromptResponse(
        genres=", ".join(req.genres) if req.genres else "Pop, Electronic",
        styles="Upbeat, Energetic",
        lyrics_formatted="\n".join(formatted)
    )
