<script setup lang="ts">
import { Product } from "@/types/products/product";
import { fetchProducts } from "@/api/productApi";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const products = ref<Product[]>([]);

onMounted(async () => {
  try {
    const response = await fetchProducts(
      { page: 0, size: 4 },
      { categoryId: 1 }
    );
    if (response.ok) {
      products.value = response.data.content;
    }
  } catch (error) {
    toast.error("Error fetching products");
    console.error(error);
  }
});

function addToCart(product: Product) {
  alert(`Added to cart: ${product.name}`);
}
</script>

<template>
  <div class="container">
    <h2 class="text-center mb-4">This Week Top Sales</h2>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
      <div v-for="product in products" :key="product.id" class="col">
        <div class="card h-100 text-start modern-card">
          <img
            src="/products/img-1.jpg"
            :alt="product.name"
            class="card-img-top modern-img"
          />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text text-danger fw-bold">${{ product.price }}</p>
          </div>
          <div class="add-to-cart-text" @click="addToCart(product)">
            + Add To Cart
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modern-card {
  border: none;
  border-radius: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  position: relative;
}

.modern-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.modern-img {
  border-radius: 0;
  height: 300px;
  object-fit: cover;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.card-text {
  font-size: 1rem;
}

.card-body {
  background-color: #fff;
}

.add-to-cart-text {
  color: red;
  position: absolute;
  bottom: 16px;
  right: 16px;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modern-card:hover .add-to-cart-text {
  opacity: 1;
  transform: translateY(0);
}
</style>
