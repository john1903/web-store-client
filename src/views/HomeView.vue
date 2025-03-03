<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import ImageCarousel from "@/components/ImageCarousel.vue";
import ProductsRow from "@/components/ProductsRow.vue";
import CategoryTiles from "@/components/CategoryTiles.vue";
import { fetchProducts } from "@/api/productApi";
import { fetchCategories } from "@/api/categoryApi";
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { Product } from "@/types/products/product";
import { Category } from "@/types/categories/category";

const toast = useToast();

const products = ref<Product[]>([]);
const categories = ref<Category[]>([]);

function handleAddToCart(product: Product) {
  alert(`Added to cart: ${product.name}`);
}

onMounted(async () => {
  try {
    const response = await fetchProducts({ page: 0, size: 5 });
    if (response.ok) {
      products.value = response.data.content;
    }
  } catch (error) {
    toast.error("Error fetching products");
    console.error(error);
  }
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
  <MainLayout>
    <ImageCarousel class="mb-4" />
    <CategoryTiles class="mb-4" :categories="categories" />
    <ProductsRow
      class="mb-4"
      :products="products"
      @addToCart="handleAddToCart"
    />
  </MainLayout>
</template>

<style scoped></style>
