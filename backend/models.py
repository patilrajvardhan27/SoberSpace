from pydantic import BaseModel
from typing import List, Dict

class Addiction(BaseModel):
    name: str
    intake: str

class Lifestyle(BaseModel):
    sleepHours: str
    exerciseFrequency: str

class UserData(BaseModel):
    name: str
    age: str
    gender: str
    email: str
    occupation: str
    location: str
    addictions: List[Addiction]
    lifestyle: Lifestyle
