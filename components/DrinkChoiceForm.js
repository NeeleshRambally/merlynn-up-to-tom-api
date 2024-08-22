import { useState, useEffect } from 'react';
import { fetchModelMetadata, queryModel } from '../lib/api';

const DrinkChoiceForm = ({ modelId, onDecision }) => {
  const [metadata, setMetadata] = useState(null);
  const [inputVariables, setInputVariables] = useState({});
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputVariables({ ...inputVariables, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before making a new request
    onDecision(null); // Clear any previous decision

    const result = await queryModel(modelId, inputVariables);

    if (result.success) {
      try {
        const response = await fetch('/api/saveRequestResponse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            modelId,
            inputVariables,
            decision: result.data,
            error: null,
            createdAt: new Date(),
          }),
        });
        const responseData = await response.json();
        if (!responseData.success) {
          console.error('Failed to save request and response:', responseData.error);
        }
      } catch (saveError) {
        console.error('Failed to save request and response:', saveError);
      }

      setError(null); // Clear any previous errors
      onDecision(result.data); // Pass the new data to the parent component
    } else {
      try {
        await fetch('/api/saveRequestResponse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            modelId,
            inputVariables,
            decision: null,
            error: result.error,
            createdAt: new Date(),
          }),
        });
      } catch (saveError) {
        console.error('Failed to save request and response:', saveError);
      }
      setError(result.error); // Set the error message
      onDecision(null); // Clear the decision block on error
    }
  };

  useEffect(() => {
    const loadMetadata = async () => {
      const data = await fetchModelMetadata(modelId);
      setMetadata(data.data.attributes.metadata); // Adjust this line based on actual structure
    };
    loadMetadata();
  }, [modelId]);

  useEffect(() => {
    // Clear input fields and error message when the model changes
    setInputVariables({});
    setError(null);
  }, [modelId]);

  if (!metadata) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-50 border border-gray-200 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{metadata.name}</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {metadata.attributes && metadata.attributes.map((variable) => (
          <div key={variable.name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{variable.question}</label>
            <input
              type="text"
              name={variable.name}
              value={inputVariables[variable.name] || ''} // Ensure input field is cleared
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-200"
        >
          Get Decision
        </button>
      </form>
    </div>
  );
};

export default DrinkChoiceForm;
