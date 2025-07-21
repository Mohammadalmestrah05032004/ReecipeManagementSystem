from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

class IngredientsRequest(BaseModel):
    ingredients: str

@app.post("/suggest_recipe")
async def suggest_recipe(request: IngredientsRequest):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful AI chef assistant."
            },
            {
                "role": "user",
                "content": f"Suggest a recipe with these ingredients: {request.ingredients}"
            }
        ]
    )
    return {"recipe": response.choices[0].message.content}
