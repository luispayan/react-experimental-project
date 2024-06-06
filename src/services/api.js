// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};  

const api = axios.create({
  baseURL: API_URL,
});

export const getProducts = async () => {
  try {
    const response = await api.get('/products', config);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};