<script setup lang="ts">
import { ref } from "vue";

const isNavCollapsed = ref(true);
const toggleNav = () => {
  isNavCollapsed.value = !isNavCollapsed.value;
};

const searchQuery = ref("");
const handleSearch = () => {
  console.log("Searching:", searchQuery.value);
};
</script>

<template>
  <nav class="navbar navbar-expand-lg border-bottom py-2">
    <div class="container-fluid d-flex align-items-center">
      <a class="navbar-brand fw-bold text-dark m-0" href="#">MY BRAND</a>
      <button
        class="navbar-toggler border-0"
        type="button"
        @click="toggleNav"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list"></i>
      </button>
      <div
        class="collapse navbar-collapse flex-grow-1 gap-1"
        :class="{ show: !isNavCollapsed }"
      >
        <div class="d-flex flex-grow-1 justify-content-center px-3">
          <ul
            class="navbar-nav d-flex flex-column flex-sm-row align-items-center justify-content-center gap-1 gap-sm-5"
          >
            <RouterLink to="/" class="nav-link text-uppercase text-dark">
              Home
            </RouterLink>
            <li class="nav-item">
              <a class="nav-link text-uppercase text-dark" href="#">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-uppercase text-dark" href="#"
                >Recommended</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link text-uppercase text-dark" href="#"
                >Contact us</a
              >
            </li>
          </ul>
        </div>
        <div class="d-flex flex-column flex-sm-row align-items-center">
          <form
            class="d-flex align-items-center"
            @submit.prevent="handleSearch"
          >
            <input
              v-model="searchQuery"
              type="text"
              class="form-control"
              style="min-width: 300px"
              placeholder="Search product..."
            />
            <button type="submit" class="btn btn-link text-dark">
              <i class="bi bi-search fs-5"></i>
            </button>
          </form>
          <div class="d-flex">
            <button class="btn btn-link text-dark" aria-label="My account">
              <i class="bi bi-person fs-5"></i>
            </button>
            <button class="btn btn-link text-dark" aria-label="Cart">
              <i class="bi bi-bag fs-5"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
