<script setup lang="ts">
import FooterNavigation from "@/components/FooterNavigation.vue";
import MainNavigation from "@/components/MainNavigation.vue";
import ScrollUpButton from "@/components/ScrollUpButton.vue";
import type { ProductFilters } from "@/types/products/productFilters";

function handleSearch(filters: ProductFilters) {
  alert(`Searching for: ${filters.name}`);
}
</script>

<template>
  <div class="d-flex flex-column">
    <MainNavigation @filterChanged="handleSearch" />
    <slot />
    <ScrollUpButton />
    <FooterNavigation />
  </div>
</template>

<style scoped></style>
