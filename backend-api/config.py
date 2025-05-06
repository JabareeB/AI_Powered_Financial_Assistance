from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:budgetly@localhost/ai_financial_assistance"
try:
    # Test the connection
    engine = create_engine(DATABASE_URL)
    connection = engine.connect()
    print("Database connection successful!")
    connection.close()
except Exception as e:
    print(f"Database connection failed: {e}")