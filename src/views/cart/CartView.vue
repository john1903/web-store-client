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

const editingItemId = ref<number | null>(null);
const quantity = ref<number | null>(null);

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

function handleEditItem(id: number) {
  const item = cart.value.items.find((item) => item.id === id);
  quantity.value = item ? item.quantity : null;
  editingItemId.value = id;
}

async function handleSaveChanges() {
  quantity.value = null;
  editingItemId.value = null;
  try {
    await cartService.updateCart({
      items: cart.value.items.map((item) => ({
        id: item.id,
        productId: item.product.id,
        quantity: item.quantity,
      })),
    });
    toast.success("Changes saved");
  } catch (error) {
    toast.error("Error saving cart");
  }
  await getCart();
}

function handleCancelEditing() {
  toast.info("Editing canceled");
  editingItemId.value = null;
  quantity.value = null;
}

function handleIncrease(itemId: number) {
  const item = cart.value.items.find((i) => i.id === itemId);
  if (item) {
    item.quantity++;
    quantity.value = item.quantity;
  }
}

function handleDecrease(itemId: number) {
  const item = cart.value.items.find((i) => i.id === itemId);
  if (item && item.quantity > 1) {
    item.quantity--;
    quantity.value = item.quantity;
  }
}

async function handleRemoveItem(id: number) {
  cart.value.items = cart.value.items.filter((i) => i.id !== id);
  await handleSaveChanges();
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
            <RouterLink
              :to="`/products/${item.product.id}`"
              class="text-decoration-none text-dark"
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
                    <h5 class="card-title">{{ item.product.name }}</h5>
                    <p class="card-text">{{ item.product.description }}</p>
                    <p class="card-text text-danger fw-bold">
                      {{ item.quantity }}
                      <span><i class="bi bi-x" /></span>
                      ${{ item.product.price }}
                    </p>
                    <div class="d-flex gap-2">
                      <template v-if="editingItemId !== item.id">
                        <button
                          class="btn btn-minimal-2"
                          @click.stop.prevent="handleEditItem(item.id)"
                        >
                          <span class="me-2"><i class="bi bi-pencil"></i></span>
                          Edit
                        </button>
                        <button
                          class="btn btn-minimal-2"
                          @click.stop.prevent="handleRemoveItem(item.id)"
                        >
                          <span class="me-2"><i class="bi bi-x-lg"></i></span>
                          Remove
                        </button>
                      </template>
                      <template v-else>
                        <div class="quantity-display">
                          <button
                            class="btn btn-minimal-2"
                            @click.stop.prevent="handleDecrease(item.id)"
                          >
                            <i class="bi bi-dash-lg"></i>
                          </button>
                          <span class="mx-1">{{ quantity }}</span>
                          <button
                            class="btn btn-minimal-2"
                            @click.stop.prevent="handleIncrease(item.id)"
                          >
                            <i class="bi bi-plus-lg"></i>
                          </button>
                        </div>
                        <button
                          class="btn btn-minimal"
                          @click.stop.prevent="handleSaveChanges"
                        >
                          Save
                        </button>
                        <button
                          class="btn btn-minimal"
                          @click.stop.prevent="handleCancelEditing"
                        >
                          Cancel
                        </button>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </RouterLink>
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
.modern-card img {
  max-height: 25vh;
}

.fill-column {
  width: 100%;
  min-height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
