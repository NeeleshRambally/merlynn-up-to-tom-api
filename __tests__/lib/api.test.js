import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchModelMetadata, queryModel, fetchAllModels } from '../../lib/api';  

  
describe('API Functions', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  describe('fetchModelMetadata', () => {
    it('should fetch model metadata successfully', async () => {
      const modelId = 'test-model-id';
      const mockResponse = { data: { id: modelId, attributes: { name: 'Test Model' } } };

      // Mocking the exact URL that would be called in the API function
      mock.onGet(`${process.env.NEXT_PUBLIC_BASE_URL}/models/${modelId}`).reply(200, mockResponse);

      const result = await fetchModelMetadata(modelId);

      expect(result).toEqual(mockResponse);
    });

    it('should handle errors while fetching model metadata', async () => {
      const modelId = 'invalid-model-id';

      mock.onGet(`${process.env.NEXT_PUBLIC_BASE_URL}/models/${modelId}`).reply(404);

      await expect(fetchModelMetadata(modelId)).rejects.toThrow();
    });
  });

  describe('queryModel', () => {
    it('should return decision data successfully', async () => {
      const modelId = 'test-model-id';
      const inputVariables = { INPUTVAR1: 'value1', INPUTVAR2: 'value2' };
      const mockResponse = { data: { id: 'decision-id', attributes: { decision: 'Test Decision' } } };

      mock.onPost(`${process.env.NEXT_PUBLIC_BASE_URL}/decision/${modelId}`).reply(200, mockResponse);

      const result = await queryModel(modelId, inputVariables);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
    });

    it('should handle errors during model query', async () => {
      const modelId = 'test-model-id';
      const inputVariables = { INPUTVAR1: 'value1', INPUTVAR2: 'value2' };

      mock.onPost(`${process.env.NEXT_PUBLIC_BASE_URL}/decision/${modelId}`).reply(422, { errors: [{ detail: 'Invalid input' }] });

      const result = await queryModel(modelId, inputVariables);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid input: Invalid input');
    });
  });

  describe('fetchAllModels', () => {
    it('should fetch all models successfully', async () => {
      const mockResponse = { data: [{ id: 'model1' }, { id: 'model2' }] };

      mock.onGet(`${process.env.NEXT_PUBLIC_BASE_URL}/models`).reply(200, mockResponse);

      const result = await fetchAllModels();

      expect(result).toEqual(mockResponse);
    });

    it('should handle errors while fetching all models', async () => {
      mock.onGet(`${process.env.NEXT_PUBLIC_BASE_URL}/models`).reply(503);

      await expect(fetchAllModels()).rejects.toThrow();
    });
  });
});
