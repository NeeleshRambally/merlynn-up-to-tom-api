import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ModelPicker from '../../src/components/ModelPicker';
import { fetchAllModels } from '../../src/lib/api';

jest.mock('../../src/lib/api'); 

describe('ModelPicker', () => {
  const mockModels = {
    data: [
      { id: 'model1', attributes: { name: 'Model 1' } },
      { id: 'model2', attributes: { name: 'Model 2' } },
      { id: 'model3', attributes: { name: 'Model 3' } },
    ],
  };

  beforeEach(() => {
    fetchAllModels.mockResolvedValue(mockModels); 
  });

  test('fetches models and sets the default selected model', async () => {
    const mockOnSelectModel = jest.fn();

    render(<ModelPicker onSelectModel={mockOnSelectModel} />);

    await waitFor(() => expect(fetchAllModels).toHaveBeenCalled());

    expect(screen.getByText('Model 1')).toBeInTheDocument();
    expect(screen.getByText('Model 2')).toBeInTheDocument();
    expect(screen.getByText('Model 3')).toBeInTheDocument();

    expect(mockOnSelectModel).toHaveBeenCalledWith('model1');
    expect(screen.getByRole('combobox')).toHaveValue('model1');
  });

  test('allows user to change the selected model', async () => {
    const mockOnSelectModel = jest.fn();

    render(<ModelPicker onSelectModel={mockOnSelectModel} />);

    await waitFor(() => expect(fetchAllModels).toHaveBeenCalled());

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'model2' } });

    expect(mockOnSelectModel).toHaveBeenCalledWith('model2');
    expect(screen.getByRole('combobox')).toHaveValue('model2');

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'model3' } });

    expect(mockOnSelectModel).toHaveBeenCalledWith('model3');
    expect(screen.getByRole('combobox')).toHaveValue('model3');
  });
});
