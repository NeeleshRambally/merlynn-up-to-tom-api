import React, { useState, useEffect } from 'react';
import { fetchAllModels } from '../lib/api';

const ModelPicker = ({ onSelectModel }) => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');

  useEffect(() => {
    const loadModels = async () => {
      const data = await fetchAllModels();
      console.log('Fetched models:', data);
      const modelsList = data.data || [];
      setModels(modelsList);

      if (modelsList.length > 0 && !selectedModel) {
        setSelectedModel(modelsList[0].id);  // Default to the first model
        onSelectModel(modelsList[0].id);
      }
    };
    loadModels();
  }, [onSelectModel]);

  const handleChange = (e) => {
    const modelId = e.target.value;
    setSelectedModel(modelId);
    onSelectModel(modelId);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Select a Model:</label>
      <select
        value={selectedModel}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.attributes.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelPicker;
