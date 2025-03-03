<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import { Product } from "@/types/products/product";
defineProps<{
  title?: string;
  products: Product[];
}>();
const emit = defineEmits<{
  (e: "addToCart", product: Product): void;
}>();

function handleAddToCart(product: Product) {
  emit("addToCart", product);
}
</script>

<template>
  <div class="container">
    <h2 class="text-center mb-4">{{ title }}</h2>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
      <div v-for="product in products" :key="product.id" class="col">
        <div class="card h-100 text-start modern-card">
          <img
            :src="product.imageUrl"
            :alt="product.name"
            class="card-img-top modern-img"
          />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text text-danger fw-bold">${{ product.price }}</p>
          </div>
          <div class="add-to-cart-text" @click="handleAddToCart(product)">
            + Add To Cart
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
