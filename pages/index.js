import React, { useState, useEffect } from 'react';
import ModelPicker from '../components/ModelPicker';
import DrinkChoiceForm from '../components/DrinkChoiceForm';

export default function Home() {
  const [selectedModel, setSelectedModel] = useState('5a8e7a36c627fb0007dd7249');
  const [decision, setDecision] = useState(null);

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
        <h1 className="text-3xl font-bold mb-6 text-center">Model Selection</h1>
        <ModelPicker onSelectModel={(model) => { setSelectedModel(model); setDecision(null); }} />
        <DrinkChoiceForm modelId={selectedModel} onDecision={setDecision} />
        {renderDecision(decision)}
      </div>
    </div>
  );
}
