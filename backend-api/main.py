from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routes import summary
import openai
import os

# Load environment variables from .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize FastAPI app
app = FastAPI(title="AI Financial Assistance API")

# Configure CORS for frontend (adjust in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root health check route
@app.get("/")
def read_root():
    return {"message": "✅ AI Financial Backend is running."}

# AI Chatbot route
@app.post("/ask-ai/")
async def ask_ai(request: Request):
    try:
        data = await request.json()
        question = data.get("question")

        if not question:
            return {"answer": "⚠️ Please provide a valid question."}

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a professional AI financial advisor. "
                        "Give concise, insightful, and encouraging financial advice tailored to each question."
                    )
                },
                {
                    "role": "user",
                    "content": question
                }
            ],
            max_tokens=150,
            temperature=0.7
        )

        answer = response['choices'][0]['message']['content'].strip()
        return {"answer": answer}

    except Exception as e:
        print(f"[OpenAI Error] {e}")
        return {"answer": "❌ Something went wrong. Please try again later."}

# Weekly summary route
app.include_router(summary.router, prefix="/summary", tags=["Summary"])
