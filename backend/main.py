from fastapi import FastAPI
from app.controllers import user_controller

app = FastAPI()

# Include controller routes
app.include_router(user_controller.router)

@app.get("/")
def root():
    return {"message": "FastAPI Application is running!"}