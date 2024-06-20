import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const API_URL = 'http://localhost:5000';
const token = localStorage.getItem('token');

const config: AxiosRequestConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Authorization": token
  }
};

const api = axios.create({
  baseURL: API_URL,
});

const handleUnauthorized = (error: any) => {
  if ([401, 403].includes(error.response.status)) {
    const alertOptions: SweetAlertOptions = {
      title: 'Session expired',
      text: 'Please log in again.',
      icon: 'error',
      confirmButtonText: 'Log in',
    };
    withReactContent(Swal).fire(alertOptions).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    });
  }
}

export const login = async (username: string, password: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.post('/login', { username, password }, config);
    return response.data;
  } catch (error: any) {
    const alertOptions: SweetAlertOptions = {
      title: "<i>Error while trying to log in.</i>",
      text: error.response.data.message
    };
    withReactContent(Swal).fire(alertOptions);
    console.error('Error trying to log in:', error);
    throw error;
  }
};

export const register = async (username: string, password: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.post('/register', { username, password }, config);
    return response.data;
  } catch (error: any) {
    const alertOptions: SweetAlertOptions = {
      title: "<i>Error while trying to register.</i>",
      text: error.response.data.message
    };
    withReactContent(Swal).fire(alertOptions);
    console.error('Error trying to register:', error);
    throw error;
  }
};

export const getProducts = async (): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.get('/products', config);
    return response.data;
  } catch (error: any) {
    handleUnauthorized(error);
    throw error;
  }
};

export const deleteProduct = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.delete(`/products/${id}`, config);
    console.log("response.data: ", response)
    return response.data;
  } catch (error: any) {
    handleUnauthorized(error);
    throw error;
  }
};

export const createProduct = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.post(`/products`, data, config);
    console.log("response.data: ", response)
    return response.data;
  } catch (error: any) {
    handleUnauthorized(error);
    throw error;
  }
};

export const updateProduct = async (id: any, data: any): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.put(`/products/${id}`, data, config);
    console.log("response.data: ", response)
    return response.data;
  } catch (error: any) {
    handleUnauthorized(error);
    throw error;
  }
};
