<script setup lang="ts">
import FooterNavigation from "@/components/FooterNavigation.vue";
import MainNavigation from "@/components/MainNavigation.vue";
import ScrollUpButton from "@/components/ScrollUpButton.vue";
import type { ProductFilters } from "@/types/products/productFilters";
import { useRouter } from "vue-router";

const router = useRouter();

function handleSearch(filters: ProductFilters) {
  router.push({ name: "products", query: { ...filters } });
}
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <MainNavigation @filterChanged="handleSearch" />
    <slot />
    <ScrollUpButton />
    <FooterNavigation />
  </div>
</template>

<style scoped></style>
