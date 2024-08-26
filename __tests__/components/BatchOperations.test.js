import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BatchOperations from '../../src/components/BatchOperations';
import {
  uploadBatchFile,
  getListOfBatchFilesAndRunningJobs,
  retrieveProcessedBatchFile,
  deleteBatchFile
} from '../../src/lib/api';

jest.mock('../../src/lib/api');

describe('BatchOperations', () => {
  const modelId = 'test-model-id';

  beforeEach(() => {
    jest.clearAllMocks();
        global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost/some-blob-url');
  });


  test('handles successful batch file upload', async () => {
    const mockResponse = { success: true, data: { message: 'Batch uploaded successfully.' } };
    uploadBatchFile.mockResolvedValue(mockResponse);

    render(<BatchOperations modelId={modelId} />);

    const file = new File(['test-content'], 'test.csv', { type: 'text/csv' });

    const fileInput = screen.getByLabelText(/upload batch file/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(screen.getByRole('button', { name: /upload batch file/i }));

    await waitFor(() => expect(uploadBatchFile).toHaveBeenCalledWith(modelId, file));
    expect(screen.getByText(/batch uploaded successfully/i)).toBeInTheDocument();
  });

  test('handles error during batch file upload', async () => {
    const mockResponse = { success: false, error: 'Upload failed.' };
    uploadBatchFile.mockResolvedValue(mockResponse);

    render(<BatchOperations modelId={modelId} />);

    const file = new File(['test-content'], 'test.csv', { type: 'text/csv' });

    const fileInput = screen.getByLabelText(/upload batch file/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(screen.getByRole('button', { name: /upload batch file/i }));

    await waitFor(() => expect(uploadBatchFile).toHaveBeenCalledWith(modelId, file));
    expect(screen.getByText(/upload failed/i)).toBeInTheDocument();
  });

  test('handles retrieving processed batch', async () => {
    const mockResponse = { success: true, data: 'csv content' };
    retrieveProcessedBatchFile.mockResolvedValue(mockResponse);

    render(<BatchOperations modelId={modelId} />);

    const batchIdInputs = screen.getAllByPlaceholderText(/enter batch id/i);
    const retrieveBatchInput = batchIdInputs[0];

    fireEvent.change(retrieveBatchInput, { target: { value: 'test-batch-id' } });
    fireEvent.click(screen.getByRole('button', { name: /retrieve processed batch/i }));

    await waitFor(() => expect(retrieveProcessedBatchFile).toHaveBeenCalledWith(modelId, 'test-batch-id'));
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });
});
