from fastapi import FastAPI
from apps.views import user_access_views
from utility.db_connection import Base, engine

# Initialize the database
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Register routes
app.include_router(user_access_views.router)