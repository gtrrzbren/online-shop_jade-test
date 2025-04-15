import { createRouter, createWebHistory } from 'vue-router';
import ProductsView from '../views/ProductsView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/product/:id',
      name: 'product-details',
      component: ProductDetailView,
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'products' }
    }
  ]
});

export default router;