<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import ProductsGrid from "@/components/ProductsGrid.vue";
import { ref, onMounted } from "vue";
import { fetchProducts } from "@/api/productApi";
import { fetchCategories } from "@/api/categoryApi";
import { useToast } from "vue-toastification";
import { Product } from "@/types/products/product";
import { Category } from "@/types/categories/category";
import ProductsFilter from "@/components/ProductsFilter.vue";
import ItemsPagination from "@/components/ItemsPagination.vue";

const toast = useToast();

const breadcrumbItems = ref([
  { name: "Home", to: "/" },
  { name: "Products", to: "/products" },
]);

const products = ref<Product[]>([]);
const categories = ref<Category[]>([]);
const totalProductPages = ref<number>(0);

onMounted(async () => {
  try {
    const response = await fetchProducts({ page: 0, size: 12 });
    if (response.ok) {
      products.value = response.data.content;
      totalProductPages.value = response.data.totalPages + 1;
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

function handleAddToCart(product: Product) {
  alert(`Added to cart: ${product.name}`);
}
</script>

<template>
  <MainLayout>
    <div class="container my-4">
      <BreadCrumb :items="breadcrumbItems" />
      <h2 class="fw-bold m-0">Products</h2>
      <div class="row mt-3">
        <div class="col-md-3">
          <ProductsFilter :categories="categories" />
        </div>
        <div class="col-md-9">
          <ProductsGrid :products="products" @addToCart="handleAddToCart" />
          <ItemsPagination :total-pages="totalProductPages" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped></style>
