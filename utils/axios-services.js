import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// const BASE_URL = 'https://neta-dev-xi.vercel.app/api/';
const BASE_URL = 'http://192.168.1.105:3000/api/';
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Use SecureStore to get the token
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.error('Unauthorized! Redirect to login.');
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
