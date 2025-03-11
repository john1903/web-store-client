<script setup lang="ts">
import { ref, onMounted, defineProps, computed, watch } from "vue";
import { useToast } from "vue-toastification";
import { Order } from "@/types/orders/order";
import { fetchOrderCurrentUser } from "@/api/orderApi";
import { getJwtToken, PaginationParams } from "@/common/commonImports";
import ListPagination from "@/components/ListPagination.vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  paginationParams: PaginationParams;
}>();

const router = useRouter();
const toast = useToast();

const orders = ref<Order[]>([]);
const totalOrderPages = ref<number>(0);

const jwtToken = getJwtToken();

const totalAmount = computed(() => {
  return orders.value.reduce((sum, order) => sum + order.total, 0);
});

async function handlePageChanged(paginationParams: PaginationParams) {
  await router.push({
    name: "userOrders",
    query: {
      ...paginationParams,
    },
  });
}

async function fetchOrders() {
  if (jwtToken) {
    const response = await fetchOrderCurrentUser(
      jwtToken,
      props.paginationParams
    );
    if (response.ok) {
      orders.value = response.data.content;
      totalOrderPages.value = response.data.totalPages;
    } else {
      toast.error("Error fetching orders");
    }
  } else {
    toast.error("Error fetching orders");
  }
}

onMounted(async () => {
  await fetchOrders();
});

watch(
  () => props.paginationParams,
  async () => {
    await fetchOrders();
  }
);
</script>

<template>
  <div class="modern-border">
    <div class="row justify-content-center align-items-center">
      <div v-if="orders.length > 0" class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Order ID</th>
              <th scope="col">Created At</th>
              <th scope="col">Status</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="order.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ order.id }}</td>
              <td>{{ order.orderDate }}</td>
              <td>{{ order.status.name }}</td>
              <td>${{ order.total.toFixed(2) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="4" class="text-end">Sum:</th>
              <td>${{ totalAmount.toFixed(2) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div v-else class="text-center py-4">
        <i class="bi bi-emoji-frown fs-1 text-dark"></i>
        <p class="fw-bold">Nothing Found Here</p>
      </div>
      <ListPagination
        :total-pages="totalOrderPages"
        :size="props.paginationParams.size"
        @pageChanged="handlePageChanged"
      />
    </div>
  </div>
</template>

<style scoped></style>
