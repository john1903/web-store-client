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
import { CartService, useCart } from "@/services/CartService";

const toast = useToast();
const cartService: CartService = useCart();

const products = ref<Product[]>([]);
const categories = ref<Category[]>([]);

async function handleAddToCart(product: Product) {
  try {
    await cartService.addCartItem({ productId: product.id, quantity: 1 });
    toast.success("Product added to cart");
  } catch (error) {
    toast.error("Error adding product to cart");
    console.error(error);
  }
}

onMounted(async () => {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetchProducts({ page: 0, size: 5 }, { categoryId: 5 }),
      fetchCategories({ page: 0, size: 5 }),
    ]);
    if (productsResponse.ok) {
      products.value = productsResponse.data.content;
    } else {
      toast.error("Error fetching products");
    }
    if (categoriesResponse.ok) {
      categories.value = categoriesResponse.data.content;
    } else {
      toast.error("Error fetching categories");
    }
  } catch (error) {
    toast.error("Error fetching data");
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
      :title="'This Week Top Sales'"
      :products="products"
      @addToCart="handleAddToCart"
    />
  </MainLayout>
</template>

<style scoped></style>
