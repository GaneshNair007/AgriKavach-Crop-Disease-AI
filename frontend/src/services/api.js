import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1/crop';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const diagnoseCrop = async (imageFile, cropSpecies, languagePref) => {
  const formData = new FormData();
  formData.append('image_file', imageFile);
  formData.append('crop_species', cropSpecies);
  formData.append('language_pref', languagePref);

  const response = await apiClient.post('/diagnose', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const fetchModelInfo = async () => {
  const response = await apiClient.get('/model/info');
  return response.data;
};

export const submitFeedback = async (payload) => {
  const response = await apiClient.post('/feedback', payload);
  return response.data;
};
