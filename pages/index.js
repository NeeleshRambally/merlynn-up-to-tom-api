import React, { useState, useEffect } from 'react';
import ModelPicker from '../components/ModelPicker';
import DrinkChoiceForm from '../components/DrinkChoiceForm';
import BatchOperations from '../components/BatchOperations';

export default function Home() {
  const [selectedModel, setSelectedModel] = useState('5a8e7a36c627fb0007dd7249');
  const [decision, setDecision] = useState(null);
  const [activeTab, setActiveTab] = useState('individual');

  useEffect(() => {
    console.debug("Selected Model has changed:", selectedModel);
  }, [selectedModel]);

  const renderDecision = (decision) => {
    if (!decision) return null;

    return (
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Decision:</h3>
        <table className="min-w-full bg-white">
          <tbody>
            <tr>
              <td className="px-4 py-2 font-semibold">Model:</td>
              <td className="px-4 py-2">{decision.data.attributes.model}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Timestamp:</td>
              <td className="px-4 py-2">{new Date(decision.data.attributes.timestamp).toLocaleString()}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Confidence:</td>
              <td className="px-4 py-2">{decision.data.attributes.confidence}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Meets Confidence:</td>
              <td className="px-4 py-2">{decision.data.attributes['meets-confidence'] ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Decision:</td>
              <td className="px-4 py-2">{decision.data.attributes.decision}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Input Variables:</td>
              <td className="px-4 py-2">
                <ul className="list-disc pl-5">
                  {Object.entries(decision.data.attributes.input).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Up 2 Tom API</h1>
        
        {/* Tab Navigation */}
        <div className="mt-6 flex border-b">
          <button
            onClick={() => setActiveTab('individual')}
            className={`mr-4 py-2 px-4 rounded-t ${activeTab === 'individual' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Individual Query
          </button>
          <button
            onClick={() => setActiveTab('batch')}
            className={`py-2 px-4 rounded-t ${activeTab === 'batch' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Batch Query
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === 'individual' && (
            <>
              {/* Model Picker Dropdown */}
              <ModelPicker onSelectModel={(model) => { setSelectedModel(model); setDecision(null); }} />

              {/* Form to Query Individual Decision */}
              <DrinkChoiceForm modelId={selectedModel} onDecision={setDecision} />

              {/* Display Individual Decision */}
              {renderDecision(decision)}
            </>
          )}

          {activeTab === 'batch' && (
            <>
              {/* Batch Query Functionality */}
              <BatchOperations modelId={selectedModel} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
