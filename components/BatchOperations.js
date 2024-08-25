import React, { useState } from 'react';
import {
  uploadBatchFile,
  getListOfBatchFilesAndRunningJobs,
  retrieveProcessedBatchFile,
  deleteBatchFile
} from '../lib/api';

const BatchOperations = ({ modelId }) => {
  const [csvFile, setCsvFile] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [batchStatus, setBatchStatus] = useState(null);
  const [batchIdToDelete, setBatchIdToDelete] = useState('');
  const [batchIdToRetrieve, setBatchIdToRetrieve] = useState('');

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleBatchUpload = async () => {
    if (!csvFile) {
      setError('Please upload a CSV file.');
      return;
    }

    const response = await uploadBatchFile(modelId, csvFile);
    if (response.success) {
      setResults(response.data);
      setError(null);
    } else {
      setResults(null);
      setError(response.error);
    }
  };

  const handleListRunningJobs = async () => {
    const response = await getListOfBatchFilesAndRunningJobs(modelId);
    if (response.success) {
      setFiles(response.data.files);
      setJobs(response.data.jobs);
      setError(null);
    } else {
      setFiles([]);
      setJobs([]);
      setError(response.error);
    }
  };

  const handleGetBatchStatus = async () => {
    if (!batchIdToRetrieve) {
      setError('Please enter a Batch ID to retrieve.');
      return;
    }

    const response = await retrieveProcessedBatchFile(modelId, batchIdToRetrieve);
    if (response.success) {
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', `batch_${batchIdToRetrieve}.csv`);
      document.body.appendChild(fileLink);
      fileLink.click();
      setError(null);
    } else {
      setBatchStatus(null);
      setError(response.error);
    }
  };

  const handleDeleteBatch = async () => {
    if (!batchIdToDelete) {
      setError('Please enter a Batch ID to delete.');
      return;
    }

    const response = await deleteBatchFile(modelId, batchIdToDelete);
    if (response.success) {
      setError('Batch deleted successfully.');
      setBatchIdToDelete('');
      setResults(null);
    } else {
      setError(response.error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Batch Operations</h2>
       
     
      {error && <div className="mb-4 text-red-500">Error: {error}</div>}


      <div className="mb-6">
        <h3 className="text-lg font-semibold">Upload Batch File</h3>
        <input aria-label="Upload Batch File" type="file" accept=".csv" onChange={handleFileChange} />
        <button
          onClick={handleBatchUpload}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload Batch File
        </button>

        {results && (
          <div>
            <h4 className="mt-4 text-md font-semibold">Upload Results</h4>
            <pre className="bg-gray-100 p-4 rounded-lg">{JSON.stringify(results, null, 2)}</pre>
          </div>
        )}
      </div>


      <div className="mb-6">
        <h3 className="text-lg font-semibold">List Running Jobs</h3>
        <button
          onClick={handleListRunningJobs}
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          List Running Jobs
        </button>

        {files.length > 0 && (
          <div className="mt-4">
            <h4 className="text-md font-semibold">Files</h4>
            <ul className="list-disc pl-5">
              {files.map((file) => (
                <li key={file.id}>
                  <strong>ID:</strong> {file.id} <br />
                  <strong>Errors:</strong>
                  <ul>
                    {file.errors.map((error, index) => (
                      <li key={index}>{error.message}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

        {jobs.length > 0 && (
          <div className="mt-4">
            <h4 className="text-md font-semibold">Jobs</h4>
            <ul className="list-disc pl-5">
              {jobs.map((job) => (
                <li key={job.id}>
                  <strong>ID:</strong> {job.id} <br />
                  <strong>Filename:</strong> {job.filename} <br />
                  <strong>Uploaded:</strong> {new Date(job.uploaded).toLocaleString()} <br />
                  <strong>Size:</strong> {job.size} bytes <br />
                  <strong>Progress:</strong> {Math.round(job.progress * 100)}%
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

  
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Retrieve Processed Batch</h3>
        <input
          type="text"
          placeholder="Enter Batch ID"
          value={batchIdToRetrieve}
          onChange={(e) => setBatchIdToRetrieve(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        <button
          onClick={handleGetBatchStatus}
          className="mt-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Retrieve Processed Batch
        </button>

        {batchStatus && (
          <div className="mt-4">
            <h4 className="text-md font-semibold">Batch Status</h4>
            <pre className="bg-gray-100 p-4 rounded-lg">{JSON.stringify(batchStatus, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Delete Batch</h3>
        <input
          type="text"
          placeholder="Enter Batch ID"
          value={batchIdToDelete}
          onChange={(e) => setBatchIdToDelete(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        <button
          onClick={handleDeleteBatch}
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Batch
        </button>
      </div>
    </div>
  );
};

export default BatchOperations;
