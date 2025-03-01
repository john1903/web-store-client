<script setup lang="ts">
import { Category } from "@/types/categories/category";
import { fetchCategories } from "@/api/categoryApi";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const categories = ref<Category[]>([]);

onMounted(async () => {
  try {
    const response = await fetchCategories({ page: 0, size: 5 });
    if (response.ok) {
      categories.value = response.data.content;
    }
  } catch (error) {
    toast.error("Error fetching categories");
    console.error(error);
  }
});
</script>

<template>
  <div class="container">
    <div class="row mb-4 g-4">
      <div
        v-for="category in categories.slice(0, 3)"
        :key="category.id"
        class="col-12 col-md-4"
      >
        <div class="card h-100 text-center modern-card overlay-card">
          <img
            src="/categories/img-1.jpg"
            :alt="category.name"
            class="card-img-top modern-img"
          />
          <div class="dark-overlay">
            <h5 class="text-uppercase overlay-title">{{ category.name }}</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="row g-4">
      <div
        v-for="category in categories.slice(3)"
        :key="category.id"
        class="col-12 col-md-6"
      >
        <div class="card h-100 text-center modern-card overlay-card">
          <img
            src="/categories/img-1.jpg"
            :alt="category.name"
            class="card-img-top modern-img"
          />
          <div class="dark-overlay">
            <h5 class="text-uppercase overlay-title">{{ category.name }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modern-card {
  border: none;
  border-radius: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  position: relative;
}

.modern-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

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
