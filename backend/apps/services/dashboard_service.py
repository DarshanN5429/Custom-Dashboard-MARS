from apps.repository.dashboard_repository import (
    fetch_widgets_for_user,
    fetch_widget_data,
    save_dashboard_layout
)

def get_widgets_for_user(db, user_id):
    return fetch_widgets_for_user(db, user_id)

def get_widget_data(db, widget_id):
    return fetch_widget_data(db, widget_id)

def store_dashboard_layout(db, user_id, positions):
    return save_dashboard_layout(db, user_id, positions)
