import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const chartTypes = ['Sales-Pie', 'Revenue-Bar', 'Growth-Line'];

const CreateWidget = ({ onSaveEdit, editData,onPreview

}) => {
  const [widgetName, setWidgetName] = useState('');
  const [description, setDescription] = useState('');
  const [dimensions, setDimensions] = useState({ length: '', width: '' });
  const [chartType, setChartType] = useState(chartTypes[0]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (editData) {
      const { widget } = editData;
      setWidgetName(widget.widgetName);
      setDescription(widget.description);
      setDimensions(widget.dimensions);
      setChartType(widget.chartType);
      setQuery(widget.query);
    }
  }, [editData]);

  const handleSave = () => {
    const newWidget = {
      widgetName,
      description,
      dimensions: {
        length: Number(dimensions.length) || 300,
        width: Number(dimensions.width) || 300,
      },
      chartType,
      query,
    };

    const widgets = JSON.parse(sessionStorage.getItem('widgetData')) || [];

    if (editData) {
      // Save edits
      onSaveEdit(newWidget, editData.index);
    } else {
      // Save new widget
      widgets.push(newWidget);
      sessionStorage.setItem('widgetData', JSON.stringify(widgets));
      toast.success('Widget created successfully!');
    }

    // Clear fields
    setWidgetName('');
    setDescription('');
    setDimensions({ length: '', width: '' });
    setChartType(chartTypes[0]);
    setQuery('');
  };
  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setDimensions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlePreview = () => {
    const data = {
      widgetName,
      description,
      dimensions: {
        length: dimensions.length || 300,
        width: dimensions.width || 300,
      },
      chartType,
      query,
    };
    onPreview(data);
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md  mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {editData ? 'Edit Widget' : 'Create Widget'}
      </h2>
      <form className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Widget Name
          </label>
          <input
            type="text"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter widget name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dimensions (Length × Width)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="length"
              value={dimensions.length}
              onChange={handleDimensionChange}
              className="w-1/2 p-2 border rounded"
              placeholder="Length"
            />
            <input
              type="text"
              name="width"
              value={dimensions.width}
              onChange={handleDimensionChange}
              className="w-1/2 p-2 border rounded"
              placeholder="Width"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chart Type
          </label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {chartTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Query/Endpoint
          </label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter SQL query or API endpoint"
          />
        </div>
        <div className="flex justify-end gap-2">
        <button
            type="button"
            onClick={handlePreview}
            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
          >
            Preview
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            {editData ? 'Save Changes' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWidget;
