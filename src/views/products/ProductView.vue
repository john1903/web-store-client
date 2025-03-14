<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import { Product } from "@/types/products/product";
import { fetchProduct } from "@/api/productApi";
import MainLayout from "@/layouts/MainLayout.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { useToast } from "vue-toastification";
import { useCart } from "@/services/CartService";

const toast = useToast();
const cartService = useCart();

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

async function addToCart() {
  if (product.value) {
    try {
      await cartService.addCartItem({
        productId: product.value.id,
        quantity: quantity.value,
      });
      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Error adding product to cart");
      console.error(error);
    }
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
              <button class="btn btn-minimal-2" @click="decreaseQuantity">
                <i class="bi bi-dash-lg"></i>
              </button>
              <span class="mx-1">{{ quantity }}</span>
              <button class="btn btn-minimal-2" @click="increaseQuantity">
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

<style scoped></style>
