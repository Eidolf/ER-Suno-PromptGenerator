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
    
    # Very basic placeholder logic for formatting
    in_verse = False
    in_refrain = False
    for line in lines:
        lower_line = line.lower()
        if "refrain" in lower_line or "chorus" in lower_line:
            formatted.append("[Refrain]")
            continue
        elif "strophe" in lower_line or "verse" in lower_line:
            formatted.append(f"[Verse {len([x for x in formatted if '[Verse' in x]) + 1}]")
            continue
            
        if line.strip():
            if not in_verse and not in_refrain and not formatted:
                formatted.append("[Verse 1]")
            formatted.append(line.strip())
            
    return PromptResponse(
        genres=", ".join(req.genres) if req.genres else "Pop, Electronic",
        styles="Upbeat, Energetic",
        lyrics_formatted="\n".join(formatted)
    )
