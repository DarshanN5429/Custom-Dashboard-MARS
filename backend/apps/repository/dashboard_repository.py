from sqlalchemy.orm import Session
from apps.models.dashboard import Dashboard
from apps.models.widget import Widget

def fetch_dashboard(db: Session):
    # Placeholder logic; replace with your actual user-specific widget filtering
    return db.query(Dashboard).all()

def fetch_widget_data(db: Session, widget_id: int):
    widget = db.query(Widget).filter(Widget.id == widget_id).first()
    return widget.query if widget else None

def save_dashboard_layout(db: Session, positions: dict):
    dashboard = db.query(Dashboard).first()
    if dashboard:
        dashboard.positions = positions
    else:
        dashboard = Dashboard(positions=positions)
        db.add(dashboard)
    db.commit()
    db.refresh(dashboard)
    return dashboard
