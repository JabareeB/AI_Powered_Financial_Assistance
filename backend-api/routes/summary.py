from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

@router.get("/weekly")
def get_weekly_summary():
    # Sample values — replace later with real DB logic
    income = 1200.00
    expenses = 850.50
    net = income - expenses
    goal = 1000.00
    balance = income - expenses
    progress_percent = min((balance / goal) * 100, 100)

    return {
        "date": datetime.now().strftime("%Y-%m-%d"),
        "income": round(income, 2),
        "expenses": round(expenses, 2),
        "net": round(net, 2),
        "goal": round(goal, 2),
        "progress": round(progress_percent, 1),
        "status": (
            "✅ Goal reached!" if balance >= goal
            else "⚠️ Getting close to your goal." if balance > 0
            else "❌ Over budget."
        )
    }
