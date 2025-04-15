<template>
  <div class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
    <img 
      :src="product.image" 
      :alt="product.name" 
      class="w-full h-48 object-cover"
      @error="handleImageError"
    />
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900 truncate">{{ product.name }}</h3>
      <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ product.description }}</p>
      <div class="mt-4 flex justify-between items-center">
        <span class="text-lg font-bold text-gray-900">${{ formatPrice(product.price) }}</span>
        <button 
          @click="viewDetails"
          class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-300"
        >
          Ver detalles
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { Product } from '../types';

// Props
const props = defineProps<{
  product: Product;
}>();

// Router para navegación
const router = useRouter();

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

// Método para ver detalles del producto
const viewDetails = () => {
  router.push({ name: 'product-details', params: { id: props.product.id } });
};
</script>