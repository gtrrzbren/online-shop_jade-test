<template>
    <div>
      <button 
        @click="goBack" 
        class="flex items-center text-emerald-600 mb-4 hover:text-emerald-700"
      >
        ← Volver a productos
      </button>
      
      <ProductDetails 
        :product="product" 
        :isLoading="isLoading" 
        :error="error"
        @retry="fetchProductDetails"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, computed, watch, onBeforeUnmount, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useProductStore } from '../stores/productStore';
  import ProductDetails from '../components/ProductDetails.vue';
  
  // Router y Route
  const route = useRoute();
  const router = useRouter();
  
  // Store
  const productStore = useProductStore();
  
  // Computed properties
  const productId = computed(() => Number(route.params.id));
  const product = computed(() => productStore.currentProduct);
  const isLoading = computed(() => productStore.isProductDetailsLoading);
  const error = ref<string | null>(null);
  
  // Método para cargar detalles del producto
  const fetchProductDetails = async () => {
    try {
      await productStore.fetchProductDetails(productId.value);
      error.value = null;
    } catch (err: any) {
      error.value = err.message || 'Error fetching product details';
    }
  };
  
  // Método para volver atrás
  const goBack = () => {
    router.push({ name: 'products' });
  };
  
  // Cargar detalles del producto al montar el componente
  onMounted(() => {
    fetchProductDetails();
  });
  
  // Observar cambios en el ID del producto para recargar los datos
  watch(productId, () => {
    fetchProductDetails();
  });
  
  // Limpiar el producto actual al desmontar el componente
  onBeforeUnmount(() => {
    productStore.clearCurrentProduct();
  });
  </script>