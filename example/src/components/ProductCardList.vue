<script setup lang="ts">
import ProductCard from './ProductCard.vue'

defineProps({
  products: {
    type: Array,
    required: true,
  },
})
</script>
<template>
  <div class="product-card-list">
    <ProductCard v-for="product in products" :title="product.title" :price="product.price" :image="product.image" />
  </div>
</template>
<style>
.product-card-list {
  display: flex;
  gap: 10px;
}
</style>
