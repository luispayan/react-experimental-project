import axios from 'axios';

const API_URL = 'http://localhost:5000';
const token = localStorage.getItem('token');
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Authorization": token
    }
};  

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password }, config);
    return response.data;
  } catch (error) {
    withReactContent(Swal).fire({
      title: "<i>Error while trying to log in.</i>",
      text: error.response.data.message
    })
    console.error('Error trying to log in:', error);
    throw error;
  }
};

export const register = async (username, password) => {
  try {
    const response = await api.post('/register', { username, password }, config);
    return response.data;
  } catch (error) {
    withReactContent(Swal).fire({
      title: "<i>Error while trying to register.</i>",
      text: error.response.data.message
    })
    console.error('Error trying to register:', error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get('/products', config);
    return response.data;
  } catch (error) {
    if ([401, 403].includes(error.response.status)) {
      withReactContent(Swal).fire({
        title: 'Session expired',
        text: 'Please log in again.',
        icon: 'error',
        confirmButtonText: 'Log in',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token');
          window.location.href = '/';
        }
      });
    }
    throw error;
  }
};