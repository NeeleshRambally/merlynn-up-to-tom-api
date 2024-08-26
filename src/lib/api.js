import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchModelMetadata = async (modelId) => {
  const response = await axios.get(`${BASE_URL}/models/${modelId}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
    },
  });
  return response.data;
};

export const queryModel = async (modelId, inputVariables) => {
  try {
    const payload = {
      data: {
        type: "scenario",
        attributes: {
          input: inputVariables,
        },
      },
    };

    const response = await axios.post(
      `${BASE_URL}/decision/${modelId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/vnd.api+json",
        },
      }
    );

    // Return data if the request is successful
    return { success: true, data: response.data };
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = "Bad model ID";
          break;
        case 401:
          errorMessage = "Missing or bad API key";
          break;
        case 403:
          errorMessage = "API Key is not in use or has been disabled, or no access to model";
          break;
        case 422:
          errorMessage = `Invalid input: ${error.response.data.errors[0]?.detail || "See error detail"}`;
          break;
        case 405:
          errorMessage = "Method not allowed (GET)";
          break;
        case 503:
          errorMessage = "Service is currently unavailable";
          break;
        default:
          errorMessage = `Unexpected error: ${error.response.status}`;
      }
    }

    // Return error if the request fails
    return { success: false, error: errorMessage };
  }
};

export const fetchAllModels = async () => {
  const response = await axios.get(`${BASE_URL}/models`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
    },
  });
  return response.data;
};

// Upload a batch file (CSV) for processing
export const uploadBatchFile = async (modelId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${BASE_URL}/batch/${modelId}`, formData, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    // Return data if the upload is successful
    return { success: true, data: response.data };
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = "Bad model ID or invalid file format";
          break;
        case 401:
          errorMessage = "Missing or bad API key";
          break;
        case 403:
          errorMessage = "API Key is not in use or has been disabled, or no access to model";
          break;
        case 405:
          errorMessage = "Method not allowed";
          break;
        case 503:
          errorMessage = "Service is currently unavailable";
          break;
        default:
          errorMessage = `Unexpected error: ${error.response.status}`;
      }
    }
    return { success: false, error: errorMessage };
  }
};



// Get list of batch files and running jobs
export const getListOfBatchFilesAndRunningJobs = async (modelId) => {
  try {
    const response = await axios.get(`${BASE_URL}/batch/${modelId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const { files, jobs } = response.data.data;

    return { success: true, data: { files, jobs } };
  } catch (error) {
    return handleError(error);
  }
};

// Retrieve a processed batch file
export const retrieveProcessedBatchFile = async (modelId, batchId) => {
  try {
    const response = await axios.get(`${BASE_URL}/batch/${modelId}/${batchId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      responseType: 'blob',
    });

    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Delete a batch file
export const deleteBatchFile = async (modelId, batchId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/batch/${modelId}/${batchId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Error handling helper function
const handleError = (error) => {
  let errorMessage = "An unknown error occurred";
  let statusCode = null;

  if (error.response) {
    statusCode = error.response.status;
    switch (statusCode) {
      case 400:
        errorMessage = "Bad request. Please check the data sent to the server.";
        break;
      case 401:
        errorMessage = "Unauthorized. Please check your API key.";
        break;
      case 403:
        errorMessage = "Forbidden. You don't have access to this resource.";
        break;
      case 404:
        errorMessage = "Not found. The resource you're looking for could not be found.";
        break;
      case 422:
        errorMessage = `Unprocessable Entity: ${error.response.data.errors[0]?.detail || "Invalid input data"}`;
        break;
      case 500:
        errorMessage = "Internal Server Error. Please try again later.";
        break;
      case 503:
        errorMessage = "Service Unavailable. Please try again later.";
        break;
      default:
        errorMessage = `Unexpected error: ${statusCode}`;
    }
  }

  return { success: false, error: errorMessage, status: statusCode };
};