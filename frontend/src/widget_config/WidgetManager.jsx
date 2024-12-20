import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateWidget from './CreateWidget';
import WidgetList from './WidgetList';

const WidgetManager = ({onPreview}) => {  
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    // Initialize session storage if not already set
    if (!sessionStorage.getItem('widgetData')) {
      sessionStorage.setItem('widgetData', JSON.stringify([]));
    }
  }, []);

  const handleEdit = (widget, index) => {
    setEditData({ widget, index });
  };

  const handleSaveEdit = (updatedWidget, index) => {
    const widgets = JSON.parse(sessionStorage.getItem('widgetData')) || [];
    widgets[index] = updatedWidget;
    sessionStorage.setItem('widgetData', JSON.stringify(widgets));
    setEditData(null);
    toast.success('Widget updated successfully!');
  };

  const handleDelete = (index) => {
    const widgets = JSON.parse(sessionStorage.getItem('widgetData')) || [];
    widgets.splice(index, 1);
    sessionStorage.setItem('widgetData', JSON.stringify(widgets));
    toast.info('Widget deleted successfully!');
  };

  return (
    <div className="w-1/2 ">
      <ToastContainer />
      <CreateWidget onSaveEdit={handleSaveEdit} editData={editData} onPreview={onPreview} />
      <WidgetList onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default WidgetManager;
