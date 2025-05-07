from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routes import summary
import openai
import os
from sqlalchemy.orm import Session
from config import SessionLocal
from models import TransactionDB
from pydantic import BaseModel

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

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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

# Pydantic model for request validation
class TransactionCreate(BaseModel):
    user_id: int
    amount: float
    description: str

@app.post("/transactions/")
def create_transaction(transaction: TransactionCreate, db: Session = Depends(get_db)):
    db_transaction = TransactionDB(
        user_id=transaction.user_id,
        amount=transaction.amount,
        description=transaction.description,
    )
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@app.get("/transactions/")
def get_transactions(db: Session = Depends(get_db)):
    return db.query(TransactionDB).all()

# Weekly summary route
app.include_router(summary.router, prefix="/summary", tags=["Summary"])

# Example transaction data
#example_transaction = {
    #"user_id": 1,
    #"amount": 100.50,
    #"description": "Grocery shopping"
#}
