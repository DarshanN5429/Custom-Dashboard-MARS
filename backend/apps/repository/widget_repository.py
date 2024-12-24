from sqlalchemy.orm import Session
from apps.models.widget import Widget
from sqlalchemy import text


def get_all_widgets(db: Session):
    return db.query(Widget).all()

def create_widget(db: Session, widget_data: dict):
    new_widget = Widget(**widget_data)
    db.add(new_widget)
    db.commit()
    db.refresh(new_widget)
    return new_widget

def update_widget(db: Session, widget_id: int, widget_data: dict):
    widget = db.query(Widget).filter(Widget.id == widget_id).first()
    if widget:
        for key, value in widget_data.items():
            setattr(widget, key, value)
        db.commit()
        db.refresh(widget)
    return widget

def delete_widget(db: Session, widget_id: int):
    widget = db.query(Widget).filter(Widget.id == widget_id).first()
    if widget:
        db.delete(widget)
        db.commit()
    return widget

def get_widget_by_id(db: Session, widget_id: int):
    return db.query(Widget).filter(Widget.id == widget_id).first()

def preview_widget_query(db: Session, data: str):
    query = text(data["query"])
    result = db.execute(query)
    # Fetch the result and convert it to a list of dictionaries
    columns = result.keys()
    data = [dict(zip(columns, row)) for row in result.fetchall()]
    return data
