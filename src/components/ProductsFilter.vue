<script setup lang="ts">
import { ref, defineEmits, defineProps } from "vue";
import type { ProductFilters } from "@/types/products/productFilters";
import type { Category } from "@/types/categories/category";

const props = defineProps<{
  categories: Category[];
  filters?: ProductFilters;
}>();

const productFilters = ref<ProductFilters>({
  categoryId: props.filters?.categoryId ? props.filters.categoryId : "",
  name: props.filters?.name,
  priceFrom: props.filters?.priceFrom,
  priceTo: props.filters?.priceTo,
});

const emit = defineEmits<{
  (e: "filterChanged", filters: ProductFilters): void;
}>();

function applyFilters() {
  emit("filterChanged", { ...productFilters.value });
}

function resetFilters() {
  productFilters.value = {
    categoryId: undefined,
    name: undefined,
    priceFrom: undefined,
    priceTo: undefined,
  };
  emit("filterChanged", { ...productFilters.value });
}
</script>

<template>
  <div class="modern-border">
    <div class="mb-3">
      <label for="categoryId" class="form-label">Category</label>
      <select
        v-model="productFilters.categoryId"
        id="categoryId"
        class="form-select"
      >
        <option value="">Select category</option>
        <option
          v-for="category in props.categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">Product name</label>
      <input
        type="text"
        v-model="productFilters.name"
        id="name"
        class="form-control"
        placeholder="Type product name"
      />
    </div>
    <div class="mb-3">
      <label for="priceFrom" class="form-label">Price from</label>
      <input
        type="number"
        v-model.number="productFilters.priceFrom"
        id="priceFrom"
        class="form-control"
        placeholder="Price from"
      />
    </div>
    <div class="mb-3">
      <label for="priceTo" class="form-label">Price to</label>
      <input
        type="number"
        v-model.number="productFilters.priceTo"
        id="priceTo"
        class="form-control"
        placeholder="Price to"
      />
    </div>
    <div class="text-center mt-3">
      <button class="btn-minimal me-3" @click="applyFilters">Filter</button>
      <button class="btn-minimal" @click="resetFilters">Reset</button>
    </div>
  </div>
</template>

<style scoped></style>
