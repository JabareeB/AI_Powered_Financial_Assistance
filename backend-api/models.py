from pydantic import BaseModel

class Transaction(BaseModel):
    id: str
    date: str
    income: float
    expenses: float
    balance: float
    goal: float
