import React, { useState } from 'react';
import PreviewWidget from './PreviewWidget';
import WidgetManager from './WidgetManager';

const WidgetConfig = () => {
  const [previewData, setPreviewData] = useState(null);

  const handlePreview = (widgetData) => {
    setPreviewData({
      ...widgetData,
      chart_type: widgetData.chart_type || 'Sales-Pie',
    });
  };

  return (
    <div className="flex gap-4">
      <WidgetManager onPreview={handlePreview} />
      <PreviewWidget data={previewData} />
    </div>
  );
};

export default WidgetConfig;
