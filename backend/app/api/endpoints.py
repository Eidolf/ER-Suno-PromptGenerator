from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class PromptRequest(BaseModel):
    text: str
    genres: List[str] = []
    styles: List[str] = []

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
            
    combined_tags = req.genres + req.styles
            
    return PromptResponse(
        genres=", ".join(combined_tags) if combined_tags else "",
        styles="", # Kept for API contract compatibility, but empty since we merged it above
        lyrics_formatted="\n".join(formatted)
    )
