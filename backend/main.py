from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from llm import get_llm_response

from models import UserData

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production: use specific domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_user(user_data: UserData):
    try:
        response = get_llm_response(user_data)
        return {"result": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
