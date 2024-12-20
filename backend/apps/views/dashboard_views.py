from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from utility.db_connection import get_db
from apps.services.dashboard_service import (
    get_widgets_for_user,
    get_widget_data,
    store_dashboard_layout
)

router = APIRouter(prefix="/api", tags=["Dashboard"])

@router.post("/fetch-widget")
def fetch_widget(user_id: int, db: Session = Depends(get_db)):
    widgets = get_widgets_for_user(db, user_id)
    if not widgets:
        raise HTTPException(status_code=404, detail="No widgets found for the user")
    return widgets

@router.post("/fetch-widget-data/{widget_id}")
def fetch_widget_data(widget_id: int, db: Session = Depends(get_db)):
    query = get_widget_data(db, widget_id)
    if not query:
        raise HTTPException(status_code=404, detail="Widget not found or no query available")
    try:
        data = db.execute(query).fetchall()
        return {"data": data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/dashboardlayout")
def save_dashboard_layout(user_id: int, positions: dict, db: Session = Depends(get_db)):
    layout = store_dashboard_layout(db, user_id, positions)
    return {"message": "Layout saved successfully", "layout": layout}
