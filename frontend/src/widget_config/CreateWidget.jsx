import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createWidget } from '../utils/api';

const chart_types = ['Sales-Pie', 'Revenue-Bar', 'Growth-Line'];

const CreateWidget = ({ onSaveEdit, editData, onPreview,setWidgets }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [chart_type, setChart_type] = useState(chart_types[0]);
  const [length, setLength] = useState(300);
  const [width, setWidth] = useState(300);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (editData) {
      const { widget } = editData;
      setName(widget.name);
      setDescription(widget.description);
      setLength(widget.length);
      setWidth(widget.width);
      setChart_type(widget.chart_type);
      setQuery(widget.query);
    }
  }, [editData]);

  const handleSave = async () => {
    const newWidget = {
      name,
      description,
      length,
      width,
      chart_type,
      query,
    };

    try {
      if (editData) {
        onSaveEdit(newWidget, editData.index);
      } else {
        const createdWidget = await createWidget(newWidget);
        setWidgets((prevWidgets) => [...prevWidgets, createdWidget]);
        toast.success('Widget created successfully!');
      }
      setName('');
      setDescription('');
      setLength();
      setWidth();
      setChart_type(chart_types[0]);
      setQuery('');
    } catch (error) {
      console.error('Error creating widget:', error);
      toast.error('Failed to create widget. Please try again.');
    }
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'length') {
      setLength(value);
    } else if (name === 'width') {
      setWidth(value);
    }
  };
  
  const handlePreview = () => {
    const data = {
      name,
      description,
      length,
      width,
      chart_type,
      query,
    };
    onPreview(data);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mx-auto">
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
              value={length}
              onChange={handleDimensionChange}
              className="w-1/2 p-2 border rounded"
              placeholder="Length"
            />
            <input
              type="text"
              name="width"
              value={width}
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
            value={chart_type}
            onChange={(e) => setChart_type(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {chart_types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Query
          </label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter SQL query"
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
