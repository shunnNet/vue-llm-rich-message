<script setup lang="ts">
defineProps({
  title: String,
  price: Number,
  image: String,
})

// https://fakeimg.pl/300x300/"
</script>
<template>
  <div>
    <div class="product-card">
      <div class="product-card__image">
        <img :src="image" alt="nice work" width="300" height="200" loading="lazy" />
      </div>
      <div class="product-card__content">
        <div class="product-card__title">{{ title }}</div>
        <div class="product-card__price">NT$ {{ price }}</div>
      </div>
    </div>
  </div>
</template>

<style>
.product-card {
  border-radius: 10px;
  overflow: hidden;
  width: 300px;
  background-color: #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.product-card__image {
  width: 300px;
  height: 200px;
}
.product-card__image img {
  display: block;
}

.product-card__content {
  padding: 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}

.product-card__title {
  font-size: 16px;
  font-weight: bold;
}
.product-card__price {
  font-size: 14px;
  color: #999;
  text-align: right;
}
</style>
