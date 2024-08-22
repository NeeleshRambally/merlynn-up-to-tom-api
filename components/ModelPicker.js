import { useState, useEffect } from 'react';
import { fetchAllModels } from '../lib/api';

const ModelPicker = ({ onSelectModel }) => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const loadModels = async () => {
      const data = await fetchAllModels();
      console.log('Fetched models:', data); // Log to inspect the data
      setModels(data.data || []); // Correctly access the models array
    };
    loadModels();
  }, []);

  return (
    <select onChange={(e) => onSelectModel(e.target.value)}>
      {models.map((model) => (
        <option key={model.id} value={model.id}>
          {model.attributes.name}
        </option>
      ))}
    </select>
  );
};

export default ModelPicker;
