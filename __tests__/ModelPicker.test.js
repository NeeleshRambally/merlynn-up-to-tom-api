import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ModelPicker from '../components/ModelPicker';
import { fetchAllModels } from '../lib/api';

jest.mock('../lib/api'); // Mock the API module

describe('ModelPicker', () => {
  const mockModels = {
    data: [
      { id: 'model1', attributes: { name: 'Model 1' } },
      { id: 'model2', attributes: { name: 'Model 2' } },
      { id: 'model3', attributes: { name: 'Model 3' } },
    ],
  };

  beforeEach(() => {
    fetchAllModels.mockResolvedValue(mockModels); // Mock the API response
  });

  test('fetches models and sets the default selected model', async () => {
    const mockOnSelectModel = jest.fn();

    render(<ModelPicker onSelectModel={mockOnSelectModel} />);

    // Wait for the models to be fetched and rendered
    await waitFor(() => expect(fetchAllModels).toHaveBeenCalled());

    // Ensure the dropdown has options with the correct names
    expect(screen.getByText('Model 1')).toBeInTheDocument();
    expect(screen.getByText('Model 2')).toBeInTheDocument();
    expect(screen.getByText('Model 3')).toBeInTheDocument();

    // Ensure the default model is selected and the callback is called with the first model ID
    expect(mockOnSelectModel).toHaveBeenCalledWith('model1');
    expect(screen.getByRole('combobox')).toHaveValue('model1');
  });

  test('allows user to change the selected model', async () => {
    const mockOnSelectModel = jest.fn();

    render(<ModelPicker onSelectModel={mockOnSelectModel} />);

    // Wait for the models to be fetched and rendered
    await waitFor(() => expect(fetchAllModels).toHaveBeenCalled());

    // Change the selected model to "Model 2"
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'model2' } });

    // Ensure the callback is called with the new model ID
    expect(mockOnSelectModel).toHaveBeenCalledWith('model2');
    expect(screen.getByRole('combobox')).toHaveValue('model2');

    // Change the selected model to "Model 3"
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'model3' } });

    // Ensure the callback is called with the new model ID
    expect(mockOnSelectModel).toHaveBeenCalledWith('model3');
    expect(screen.getByRole('combobox')).toHaveValue('model3');
  });
});
