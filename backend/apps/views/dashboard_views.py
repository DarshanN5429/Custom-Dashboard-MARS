from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from utility.db_connection import get_db
from apps.services.dashboard_service import (
    get_dashboard,
    get_widget_data,
    store_dashboard_layout
)

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/fetch-widget")
def fetch_widget(db: Session = Depends(get_db)):
    widgets = get_dashboard(db)
    if not widgets:
        raise HTTPException(status_code=404, detail="No widgets found")
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

@router.post("/layout")
def save_dashboard_layout_endpoint(positions: dict, db: Session = Depends(get_db)):
    layout = store_dashboard_layout(db, positions)
    return {"message": "Layout saved successfully", "layout": layout}