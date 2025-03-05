<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import { Cart } from "@/types/carts/cart";
import { useCart } from "@/services/CartService";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const cartService = useCart();

const cart = ref<Cart>({
  id: 1,
  customerId: 1,
  items: [],
  total: 0,
});

async function getCart() {
  try {
    cart.value = await cartService.getCart();
  } catch (error) {
    toast.error("Error fetching cart");
    console.error(error);
  }
}

async function handleEmptyCart() {
  try {
    await cartService.emptyCart();
    toast.success("Cart emptied");
  } catch (error) {
    toast.error("Error emptying cart");
    console.error(error);
  }
  await getCart();
}

onMounted(async () => {
  await getCart();
});
</script>

<template>
  <MainLayout>
    <div class="container py-4 flex-grow-1">
      <h2 class="fw-bold mb-3">Cart ({{ cart.items.length }})</h2>
      <div class="row">
        <div class="col-md-8">
          <div
            v-if="cart.items.length === 0"
            class="text-center modern-border py-5"
          >
            <i class="bi bi-emoji-frown fs-1 text-dark"></i>
            <p class="fw-bold">Nothing Found Here</p>
          </div>
          <div
            v-for="item in cart.items"
            :key="item.id"
            class="card modern-card mb-3"
          >
            <div class="row g-0">
              <div class="col-md-4 p-0">
                <img
                  :src="item.product.imageUrl"
                  :alt="item.product.name"
                  class="fill-column"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                    {{ item.product.name }}
                  </h5>
                  <p class="card-text">{{ item.product.description }}</p>
                  <p class="card-text text-danger fw-bold">
                    {{ item.quantity }}
                    <span>
                      <i class="bi bi-x" />
                    </span>
                    ${{ item.product.price }}
                  </p>
                  <div class="d-flex gap-2">
                    <button class="btn">
                      <span class="me-2">
                        <i class="bi bi-pencil"></i>
                      </span>
                      Edit
                    </button>
                    <button class="btn">
                      <span class="me-2">
                        <i class="bi bi-x-lg"></i>
                      </span>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <h3 class="fw-bold mb-3">Summary</h3>
          <div class="modern-border p-3">
            <div class="d-flex justify-content-between mb-2">
              <span>Value</span>
              <span>{{ cart.total }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Delivery</span>
              <span>$0.00</span>
            </div>
            <div class="d-flex justify-content-between fw-bold mb-3">
              <span>Total</span>
              <span class="text-danger">${{ cart.total }}</span>
            </div>
            <button class="btn-minimal w-100 mb-2" @click="handleEmptyCart">
              EMPTY CART
            </button>
            <button class="btn-minimal w-100 mb-2">CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
.modern-card {
  max-height: 250px;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0;
}

.btn:hover {
  background-color: #f0f0f0;
}

.fill-column {
  width: 100%;
  min-height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
