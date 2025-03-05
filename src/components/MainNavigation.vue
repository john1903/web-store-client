<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { hasRole } from "@/common/commonImports";
import { ProductFilters } from "@/types/products/productFilters";

const emit = defineEmits<{
  (e: "filterChanged", filters: ProductFilters): void;
}>();

const productFilters = ref<ProductFilters>({
  categoryId: undefined,
  name: undefined,
  priceFrom: undefined,
  priceTo: undefined,
});

const isNavCollapsed = ref(true);
const toggleNav = () => {
  isNavCollapsed.value = !isNavCollapsed.value;
};

const searchQuery = ref("");
function goSearch() {
  emit("filterChanged", { ...productFilters.value, name: searchQuery.value });
  searchQuery.value = "";
}
</script>

<template>
  <nav class="navbar navbar-expand-lg border-bottom py-2">
    <div class="container-fluid d-flex align-items-center">
      <RouterLink to="/" class="navbar-brand fw-bold text-dark m-0">
        MY BRAND
      </RouterLink>
      <button
        class="navbar-toggler border-0"
        type="button"
        @click="toggleNav"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list"></i>
      </button>
      <div
        class="collapse navbar-collapse flex-grow-1 gap-1"
        :class="{ show: !isNavCollapsed }"
      >
        <div class="d-flex flex-grow-1 justify-content-center px-3">
          <ul
            class="navbar-nav d-flex flex-column flex-sm-row align-items-center justify-content-center gap-1 gap-sm-5"
          >
            <li class="nav-item">
              <RouterLink to="/" class="nav-link text-uppercase text-dark">
                Home
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                to="/products"
                class="nav-link text-uppercase text-dark"
              >
                Products
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                to="/products?categoryId=5"
                class="nav-link text-uppercase text-dark"
              >
                Recommended
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/about" class="nav-link text-uppercase text-dark">
                About us
              </RouterLink>
            </li>
          </ul>
        </div>
        <div class="d-flex flex-column flex-sm-row align-items-center">
          <form class="d-flex align-items-center" @submit.prevent="goSearch">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control"
              style="min-width: 300px"
              placeholder="Search product..."
            />
            <button type="submit" class="btn btn-link text-dark">
              <i class="bi bi-search fs-5"></i>
            </button>
          </form>
          <div class="d-flex">
            <button class="btn btn-link text-dark" aria-label="My account">
              <i class="bi bi-person fs-5"></i>
            </button>
            <button
              v-if="hasRole('ADMIN')"
              class="btn btn-link text-dark"
              aria-label="Edit"
            >
              <i class="bi bi-pencil-square"></i>
            </button>
            <RouterLink
              to="/cart"
              v-else
              class="btn btn-link text-dark"
              aria-label="Cart"
            >
              <i class="bi bi-bag fs-5"></i>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
