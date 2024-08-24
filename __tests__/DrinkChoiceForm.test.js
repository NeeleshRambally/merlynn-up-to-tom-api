import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DrinkChoiceForm from '../components/DrinkChoiceForm';
import { fetchModelMetadata, queryModel } from '../lib/api';

// Mock the API calls
jest.mock('../lib/api', () => ({
  fetchModelMetadata: jest.fn(),
  queryModel: jest.fn(),
}));

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

describe('DrinkChoiceForm', () => {
  const mockOnDecision = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form correctly and submits with inputs', async () => {
    const mockMetadata = {
      name: 'Drink Choice',
      attributes: [
        { name: 'INPUTVAR1', question: 'Temperature?' },
        { name: 'INPUTVAR2', question: 'Age?' },
      ],
    };

    const mockResult = { success: true, data: { decision: 'Espresso' } };

    fetchModelMetadata.mockResolvedValueOnce({
      data: { attributes: { metadata: mockMetadata } },
    });

    queryModel.mockResolvedValueOnce(mockResult);

    render(<DrinkChoiceForm modelId="test-model" onDecision={mockOnDecision} />);

    // Wait for the metadata to load
    await waitFor(() => expect(screen.getByText('Drink Choice')).toBeInTheDocument());

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText('Temperature?'), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText('Age?'), { target: { value: '30' } });

    // Submit the form
    fireEvent.click(screen.getByText('Get Decision'));

    // Ensure the API call was made
    await waitFor(() => {
      expect(queryModel).toHaveBeenCalledWith('test-model', { INPUTVAR1: '25', INPUTVAR2: '30' });
    });

    // Ensure the onDecision callback was called with the decision
    expect(mockOnDecision).toHaveBeenCalledWith(mockResult.data);

    // Ensure the success response was handled properly
    expect(screen.queryByText(/Failed to save request and response/i)).not.toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    const mockMetadata = {
      name: 'Drink Choice',
      attributes: [
        { name: 'INPUTVAR1', question: 'Temperature?' },
        { name: 'INPUTVAR2', question: 'Age?' },
      ],
    };
  
    const mockError = { success: false, error: 'Invalid input' };
  
    fetchModelMetadata.mockResolvedValueOnce({
      data: { attributes: { metadata: mockMetadata } },
    });
  
    queryModel.mockResolvedValueOnce(mockError);
  
    render(<DrinkChoiceForm modelId="test-model" onDecision={mockOnDecision} />);
  
    // Wait for the metadata to load
    await waitFor(() => expect(screen.getByText('Drink Choice')).toBeInTheDocument());
  
    // Fill in the form fields
    fireEvent.change(screen.getByLabelText('Temperature?'), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText('Age?'), { target: { value: '30' } });
  
    // Submit the form
    fireEvent.click(screen.getByText('Get Decision'));
  
    // Ensure the API call was made
    await waitFor(() => {
      expect(queryModel).toHaveBeenCalledWith('test-model', { INPUTVAR1: '25', INPUTVAR2: '30' });
    });
  
    // Ensure the onDecision callback was called with `null` due to the error
    expect(mockOnDecision).toHaveBeenCalledWith(null);
  
    // Ensure the error message is displayed
    expect(screen.getByText('Invalid input')).toBeInTheDocument();
  });
  
});
