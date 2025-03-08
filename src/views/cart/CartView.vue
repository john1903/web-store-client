<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import { Cart } from "@/types/carts/cart";
import { useCart } from "@/services/CartService";
import { computed, onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { createOrder } from "@/api/orderApi";
import { getJwtPayload, getJwtToken, isAuthenticated } from "@/utils/security";

const toast = useToast();
const router = useRouter();
const cartService = useCart();

const cart = ref<Cart>({
  id: 1,
  customerId: 1,
  items: [],
  total: 0,
});

const editingItemId = ref<number | null>(null);
const quantity = ref<number | null>(null);

const email = ref<string>("");
const phoneNumber = ref<string>("");

const disabled = computed(() => cart.value.items.length === 0);
const authenticated = computed(() => {
  return isAuthenticated();
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

async function handleCheckout() {
  const items = cart.value.items.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
  }));
  let orderData;
  let token;
  if (isAuthenticated()) {
    token = getJwtToken();
    if (token) {
      const payload = getJwtPayload(token);
      if (payload) {
        orderData = { customerId: payload.id, items };
      }
    }
  }
  if (!orderData) {
    orderData = {
      email: email.value,
      phoneNumber: phoneNumber.value,
      items,
    };
  }
  try {
    const response = await createOrder(orderData, token);
    if (response.ok) {
      toast.success("Order successfully created");
      await router.push(`/`);
    } else {
      toast.error("Error creating order");
      console.error(response.error);
    }
  } catch (error) {
    toast.error("Error creating order");
    console.error(error);
  }
  await cartService.emptyCart();
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
            <hr class="my-3" />
            <form
              v-if="!authenticated"
              @submit.prevent="handleCheckout"
              class="mb-2"
            >
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  autocomplete="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="phoneNumber" class="form-label">Phone</label>
                <input
                  type="tel"
                  class="form-control"
                  id="phoneNumber"
                  v-model="phoneNumber"
                  autocomplete="tel"
                  required
                />
              </div>
              <button
                :disabled="disabled"
                type="submit"
                class="btn-minimal w-100"
              >
                CHECKOUT
              </button>
            </form>
            <button
              v-else
              :disabled="disabled"
              class="btn-minimal w-100 mb-2"
              @click="handleCheckout"
            >
              CHECKOUT
            </button>
            <button
              :disabled="disabled"
              class="btn-minimal w-100"
              @click="handleEmptyCart"
            >
              EMPTY CART
            </button>
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
