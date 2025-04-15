import { defineStore } from 'pinia';
import { getProducts, getProductDetails } from '../services/api';
import type { Product, LoadingState } from '../types';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    currentProduct: null as Product | null,
    productsLoadingState: 'idle' as LoadingState,
    productDetailsLoadingState: 'idle' as LoadingState,
    error: null as string | null,
  }),
  
  getters: {
    getProductById: (state) => (id: number) => {
      return state.products.find(product => product.id === id);
    },
    isProductsLoading: (state) => state.productsLoadingState === 'loading',
    isProductDetailsLoading: (state) => state.productDetailsLoadingState === 'loading',
  },
  
  actions: {
    async fetchProducts() {
      this.productsLoadingState = 'loading';
      this.error = null;
      
      try {
        const products = await getProducts();
        this.products = products;
        this.productsLoadingState = 'success';
      } catch (error) {
        this.productsLoadingState = 'error';
        this.error = 'Error al cargar los productos';
        console.error('Error in fetchProducts:', error);
      }
    },
    
    async fetchProductDetails(id: number) {
      this.productDetailsLoadingState = 'loading';
      this.error = null;
      
      try {
        const product = await getProductDetails(id);
        this.currentProduct = product;
        this.productDetailsLoadingState = 'success';
      } catch (error) {
        this.productDetailsLoadingState = 'error';
        this.error = `Error al cargar los detalles del producto ${id}`;
        console.error('Error in fetchProductDetails:', error);
      }
    },
    
    clearCurrentProduct() {
      this.currentProduct = null;
    }
  },
});