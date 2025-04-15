<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Nuestros Productos</h1>
    
    <ProductGrid 
      :products="products" 
      :isLoading="isLoading" 
      :error="error"
      @retry="fetchProducts"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useProductStore } from '../stores/productStore';
import ProductGrid from '../components/ProductGrid.vue';

// Store
const productStore = useProductStore();

// Método para cargar productos
const fetchProducts = async () => {
  await productStore.fetchProducts();
};

// Cargar productos al montar el componente
onMounted(() => {
  fetchProducts();
});

// Computed properties
const products = computed(() => productStore.products);
const isLoading = computed(() => productStore.isProductsLoading);
const error = computed(() => productStore.error);
</script>