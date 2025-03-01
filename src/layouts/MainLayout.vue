<script setup lang="ts">
import FooterNavigation from "@/components/FooterNavigation.vue";
import MainNavigation from "@/components/MainNavigation.vue";
</script>

<template>
  <div class="d-flex flex-column">
    <MainNavigation />
    <slot />
    <FooterNavigation />
  </div>
</template>

<style scoped></style>
