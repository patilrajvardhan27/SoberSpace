from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from llm import get_llm_response
from models import UserData
from db import collection  # Import MongoDB collection

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In prod: restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_user(user_data: UserData):
    try:
        response = get_llm_response(user_data)

        # Save to MongoDB
        record = {
            "user": user_data.dict(),
            "generated_response": response,
            "created_at": datetime.utcnow()
        }
        await collection.insert_one(record)

        return {"result": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
