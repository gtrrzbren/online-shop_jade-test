<template>
    <div v-if="isLoading" class="animate-pulse">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="md:flex">
          <div class="md:flex-shrink-0">
            <div class="h-64 w-full md:w-64 bg-gray-300"></div>
          </div>
          <div class="p-8 w-full">
            <div class="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div class="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div class="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div class="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
            <div class="h-8 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="error" class="text-center py-10">
      <p class="text-red-500 text-lg">{{ error }}</p>
      <button 
        @click="$emit('retry')" 
        class="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
      >
        Intentar de nuevo
      </button>
    </div>
    <div v-else-if="product" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img 
            :src="product.image" 
            :alt="product.name" 
            class="h-64 w-full md:w-64 object-cover"
            @error="handleImageError"
          />
        </div>
        <div class="p-8 w-full">
          <div class="flex justify-between items-start">
            <h2 class="text-2xl font-bold text-gray-900">{{ product.name }}</h2>
            <span class="text-2xl font-bold text-emerald-600">${{ formatPrice(product.price) }}</span>
          </div>
          <p class="mt-2 text-gray-600">{{ product.description }}</p>
          <div class="mt-4">
            <p class="text-sm text-gray-500">Categoría: {{ product.category }}</p>
            <p class="text-sm text-gray-500">Disponibles: {{ product.stock }} unidades</p>
            <div class="flex items-center mt-1">
              <span class="text-sm text-gray-500 mr-1">Valoración:</span>
              <div class="flex">
                <span v-for="i in 5" :key="i" class="text-yellow-400">
                  ★
                </span>
              </div>
              <span class="ml-1 text-sm text-gray-500">({{ product.rating }})</span>
            </div>
          </div>
          <div class="mt-6">
            <button 
              class="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-300"
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import type { Product } from '../types';
  
  // Props
  const props = defineProps<{
    product: Product | null;
    isLoading: boolean;
    error: string | null;
  }>();
  
  // Emits
  defineEmits<{
    (e: 'retry'): void;
  }>();
  
  // Estado para manejar errores de imagen
  const imageError = ref(false);
  
  // Método para formatear el precio
  const formatPrice = (price: number): string => {
    return price.toFixed(2);
  };
  
  // Método para manejar errores de carga de imagen
  const handleImageError = () => {
    imageError.value = true;
  };
  </script>