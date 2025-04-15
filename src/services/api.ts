import axios from 'axios';
import type { Product } from '../types';


const apiClient = axios.create({
  baseURL: 'https://api.example.com', // Reemplazar con la URL base real
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get('/products/published/web');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


export const getProductDetails = async (id: number): Promise<Product> => {
  try {
    const response = await apiClient.get(`/products/${id}/details`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};