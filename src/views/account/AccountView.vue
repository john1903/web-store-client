<script setup lang="ts">
import BreadCrumb from "@/components/BreadCrumb.vue";
import { ref } from "vue";
import CustomerSideNavigation from "@/components/CustomerSideNavigation.vue";
import MainLayout from "@/layouts/MainLayout.vue";

const breadcrumbItems = ref([
  { name: "Dashboard", to: "/" },
  { name: "Account", to: "/account" },
]);
</script>

<template>
  <MainLayout>
    <div class="container flex-grow-1 my-4">
      <BreadCrumb :items="breadcrumbItems" />
      <h2 class="fw-bold m-0">Account</h2>
      <div class="row mt-3">
        <div class="col-md-3">
          <CustomerSideNavigation />
        </div>
        <div class="col-md-9">
          <router-view />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped></style>
