<script setup lang="ts">
import { defineProps } from "vue";
import { Category } from "@/types/categories/category";

defineProps<{
  categories: Category[];
}>();
</script>

<template>
  <div class="container">
    <div class="row mb-4 g-4">
      <div
        v-for="category in categories.slice(0, 3)"
        :key="category.id"
        class="col-12 col-md-4"
      >
        <RouterLink
          :to="`/products?categoryId=${category.id}`"
          class="text-decoration-none"
        >
          <div class="card h-100 text-center modern-card overlay-card">
            <img
              :src="category.imageUrl"
              :alt="category.name"
              class="card-img-top modern-img"
            />
            <div class="dark-overlay">
              <h5 class="text-uppercase overlay-title">{{ category.name }}</h5>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="row g-4">
      <div
        v-for="category in categories.slice(3)"
        :key="category.id"
        class="col-12 col-md-6"
      >
        <RouterLink :to="`/products?categoryId=${category.id}`">
          <div class="card h-100 text-center modern-card overlay-card">
            <img
              :src="category.imageUrl"
              :alt="category.name"
              class="card-img-top modern-img"
            />
            <div class="dark-overlay">
              <h5 class="text-uppercase overlay-title">{{ category.name }}</h5>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modern-img {
  border-radius: 0;
  height: 300px;
  width: 100%;
  object-fit: cover;
}

.overlay-card {
  position: relative;
}

.dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  transition: background 0.3s ease;
}

.overlay-card:hover .dark-overlay {
  background: rgba(0, 0, 0, 0.5);
}

.overlay-title {
  color: #fff;
  position: absolute;
  top: 25px;
  left: 25px;
  margin: 0;
  font-size: 1.2rem;
}
</style>
