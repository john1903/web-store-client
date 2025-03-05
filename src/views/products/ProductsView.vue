<script setup lang="ts">
import { ref, onMounted, defineProps, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import MainLayout from "@/layouts/MainLayout.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import ProductsGrid from "@/components/ProductsGrid.vue";
import { fetchProducts } from "@/api/productApi";
import { fetchCategories } from "@/api/categoryApi";
import { Product } from "@/types/products/product";
import { Category } from "@/types/categories/category";
import ProductsFilter from "@/components/ProductsFilter.vue";
import ItemsPagination from "@/components/ItemsPagination.vue";
import { ProductFilters } from "@/types/products/productFilters";
import { PaginationParams } from "@/types/common/paginationParams";
import { useCart } from "@/services/CartService";

const toast = useToast();
const router = useRouter();
const cartService = useCart();

const props = defineProps<{
  paginationParams: PaginationParams;
  productsFilters: ProductFilters;
}>();

const products = ref<Product[]>([]);
const categories = ref<Category[]>([]);
const totalProductPages = ref<number>(0);

async function fetchData() {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetchProducts(props.paginationParams, props.productsFilters),
      fetchCategories({ page: 0, size: 5 }),
    ]);
    if (productsResponse.ok) {
      products.value = productsResponse.data.content;
      totalProductPages.value = productsResponse.data.totalPages;
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
}

async function handleAddToCart(product: Product) {
  try {
    await cartService.addCartItem({ productId: product.id, quantity: 1 });
    toast.success("Product added to cart");
  } catch (error) {
    toast.error("Error adding product to cart");
    console.error(error);
  }
}

async function handleFilterChanged(productFilters: ProductFilters) {
  await router.push({
    name: "products",
    query: {
      name: productFilters.name,
      categoryId: productFilters.categoryId,
      priceFrom: productFilters.priceFrom,
      priceTo: productFilters.priceTo,
    },
  });
}

async function handlePageChanged(paginationParams: PaginationParams) {
  await router.push({
    name: "products",
    query: {
      ...paginationParams,
      ...props.productsFilters,
    },
  });
}

const breadcrumbItems = computed(() => {
  const baseItems = [
    { name: "Home", to: "/" },
    { name: "Products", to: "/products" },
  ];
  if (props.productsFilters.categoryId) {
    const category = categories.value.find(
      (c) => c.id === props.productsFilters.categoryId
    );
    if (category) {
      return [
        ...baseItems,
        { name: category.name, to: `/products?categoryId=${category.id}` },
      ];
    }
  }
  return baseItems;
});

onMounted(fetchData);

watch(
  () => [props.paginationParams, props.productsFilters],
  () => fetchData(),
  { deep: true }
);
</script>

<template>
  <MainLayout>
    <div class="container my-4 flex-grow-1">
      <BreadCrumb :items="breadcrumbItems" />
      <h2 class="fw-bold m-0">Products</h2>
      <div class="row mt-3">
        <div class="col-md-3">
          <ProductsFilter
            :categories="categories"
            :filters="props.productsFilters"
            @filterChanged="handleFilterChanged"
          />
        </div>
        <div class="col-md-9">
          <div
            v-if="products.length === 0"
            class="text-center modern-border py-5"
          >
            <i class="bi bi-emoji-frown fs-1 text-dark"></i>
            <p class="fw-bold">Nothing Found Here</p>
          </div>
          <ProductsGrid
            v-else
            :products="products"
            @addToCart="handleAddToCart"
          />
          <ItemsPagination
            :total-pages="totalProductPages"
            :size="props.paginationParams.size"
            @pageChanged="handlePageChanged"
          />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped></style>
