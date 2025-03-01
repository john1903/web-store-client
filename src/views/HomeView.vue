<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import ImageCarousel from "@/components/ImageCarousel.vue";
import RecommendedProducts from "@/components/RecommendedProducts.vue";
import CategoryTiles from "@/components/CategoryTiles.vue";
</script>

<template>
  <MainLayout>
    <ImageCarousel class="mb-4" />
    <CategoryTiles class="mb-4" />
    <RecommendedProducts class="mb-4" />
  </MainLayout>
</template>

<style scoped></style>
