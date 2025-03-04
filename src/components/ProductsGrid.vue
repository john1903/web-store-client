<script setup lang="ts">
import { Product } from "@/types/products/product";
import { defineProps, defineEmits } from "vue";
defineProps<{
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
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div v-for="product in products" :key="product.id" class="col">
      <RouterLink :to="`/products/${product.id}`" class="text-decoration-none">
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
          <div
            class="add-to-cart-text"
            @click.stop.prevent="handleAddToCart(product)"
          >
            + Add To Cart
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
