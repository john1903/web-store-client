<script setup lang="ts">
import BreadCrumb from "@/components/BreadCrumb.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import AccountSideNavigation from "@/components/AccountSideNavigation.vue";

const route = useRoute();

const getBreadcrumbName = (segment: string) => {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const breadcrumbItems = computed(() => {
  const pathSegments = route.path.split("/").filter((segment) => segment);
  console.log(pathSegments);
  let fullPath = "";

  return [
    { name: "Home", to: "/" },
    ...pathSegments.map((segment) => {
      fullPath += `/${segment}`;
      return { name: getBreadcrumbName(segment), to: fullPath };
    }),
  ];
});
</script>

<template>
  <MainLayout>
    <div class="container flex-grow-1 my-4">
      <BreadCrumb :items="breadcrumbItems" />
      <h2 class="fw-bold m-0">
        {{ breadcrumbItems[breadcrumbItems.length - 1]?.name }}
      </h2>
      <div class="row mt-3">
        <div class="col-md-3">
          <AccountSideNavigation />
        </div>
        <div class="col-md-9">
          <router-view />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped></style>
