<template>
    <div>
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <LoadingSkeleton v-for="n in 8" :key="n" />
      </div>
      <div v-else-if="error" class="text-center py-10">
        <p class="text-red-500 text-lg">{{ error }}</p>
        <button 
          @click="retryLoading" 
          class="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Intentar de nuevo
        </button>
      </div>
      <div v-else-if="products.length === 0" class="text-center py-10">
        <p class="text-gray-500 text-lg">No hay productos disponibles</p>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard 
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import ProductCard from './ProductCard.vue';
  import LoadingSkeleton from './LoadingSkeleton.vue';
  import type { Product } from '../types';
  
  // Props
  const props = defineProps<{
    products: Product[];
    isLoading: boolean;
    error: string | null;
  }>();
  
  // Emits
  const emit = defineEmits<{
    (e: 'retry'): void;
  }>();
  
  // Método para reintentar la carga
  const retryLoading = () => {
    emit('retry');
  };
  </script>