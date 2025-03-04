<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import { Product } from "@/types/products/product";
import { fetchProduct } from "@/api/productApi";
import MainLayout from "@/layouts/MainLayout.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const props = defineProps<{ id: number }>();

const breadcrumbItems = ref([
  { name: "Home", to: "/" },
  { name: "Products", to: "/products" },
]);

const product = ref<Product | null>(null);
const quantity = ref(1);

onMounted(async () => {
  const response = await fetchProduct(props.id);
  if (response.ok) {
    product.value = response.data;
    breadcrumbItems.value.push(
      ...[
        {
          name: response.data.category.name,
          to: `/products?categoryId=${response.data.category.id}`,
        },
        {
          name: response.data.name,
          to: `/products/${response.data.id}`,
        },
      ]
    );
  } else {
    toast.error("Error fetching product");
    console.error(response.error);
  }
});

function addToCart() {
  if (product.value) {
    alert(`Added to cart: ${product.value.name} (Quantity: ${quantity.value})`);
  }
}

function increaseQuantity() {
  quantity.value++;
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}
</script>

<template>
  <MainLayout>
    <div class="container my-4 flex-grow-1">
      <BreadCrumb :items="breadcrumbItems" />
      <div v-if="product" class="row mt-1 align-items-center gy-3">
        <div class="col-md-6">
          <img
            :src="product.imageUrl"
            :alt="product.name"
            class="img-fluid rounded shadow-sm"
          />
        </div>
        <div class="col-md-6">
          <h3 class="fw-bold">{{ product.name }}</h3>
          <p class="text-danger fw-bold h4">${{ product.price }}</p>
          <p>{{ product.description }}</p>
          <div class="d-flex align-items-center mt-3">
            <div class="quantity-display">
              <button class="btn" @click="decreaseQuantity">
                <i class="bi bi-dash-lg"></i>
              </button>
              <span class="mx-1">{{ quantity }}</span>
              <button class="btn" @click="increaseQuantity">
                <i class="bi bi-plus-lg"></i>
              </button>
            </div>
            <button class="btn-minimal ms-3" @click="addToCart">
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
.quantity-display {
  font-size: 1rem;
  min-width: 2rem;
  text-align: center;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0;
}

.btn:hover {
  background-color: #f0f0f0;
}
</style>
