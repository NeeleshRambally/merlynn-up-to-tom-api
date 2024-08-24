import axios from 'axios';

//TODO : This key should be store in a secret - just here for testing and local running
const API_KEY = '9307bfd5fa011428ff198bb37547f979';
//TODO : Base URL should be read from the ENV - just here for testing and local running
const BASE_URL = 'https://api.up2tom.com/v3';

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

// Batch query model with an array of input scenarios
export const batchQueryModel = async (modelId, inputVariablesArray) => {
  try {
    const payload = {
      data: inputVariablesArray.map((inputVariables) => ({
        type: "scenario",
        attributes: {
          input: inputVariables,
        },
      })),
    };

    const response = await axios.post(
      `${BASE_URL}/batch/${modelId}`,
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