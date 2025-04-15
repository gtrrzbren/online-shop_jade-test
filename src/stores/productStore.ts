import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getProducts, getProductDetails } from '../services/api';
import type { Product, LoadingState } from '../types';

// Usando la sintaxis de setup
export const useProductStore = defineStore('product', () => {
  // Estado con ref() y reactive()
  const products = ref<Product[]>([]);
  const currentProduct = ref<Product | null>(null);
  const productsLoadingState = ref<LoadingState>('idle');
  const productDetailsLoadingState = ref<LoadingState>('idle');
  const error = ref<string | null>(null);
  
  // Getters
  const getProductById = (id: number) => {
    return products.value.find(product => product.id === id);
  };
  
  const isProductsLoading = computed(() => productsLoadingState.value === 'loading');
  const isProductDetailsLoading = computed(() => productDetailsLoadingState.value === 'loading');
  
  // Acciones
  async function fetchProducts() {
    productsLoadingState.value = 'loading';
    error.value = null;
    
    try {
      const fetchedProducts = await getProducts();
      products.value = fetchedProducts;
      productsLoadingState.value = 'success';
    } catch (err) {
      productsLoadingState.value = 'error';
      error.value = 'Error al cargar los productos';
      console.error('Error in fetchProducts:', err);
    }
  }
  
  async function fetchProductDetails(id: number) {
    productDetailsLoadingState.value = 'loading';
    error.value = null;
    
    try {
      const product = await getProductDetails(id);
      currentProduct.value = product;
      productDetailsLoadingState.value = 'success';
    } catch (err) {
      productDetailsLoadingState.value = 'error';
      error.value = `Error al cargar los detalles del producto ${id}`;
      console.error('Error in fetchProductDetails:', err);
    }
  }
  
  function clearCurrentProduct() {
    currentProduct.value = null;
  }
  
  return { 
    products, 
    currentProduct, 
    error, 
    getProductById, 
    isProductsLoading, 
    isProductDetailsLoading, 
    fetchProducts, 
    fetchProductDetails, 
    clearCurrentProduct 
  };
});