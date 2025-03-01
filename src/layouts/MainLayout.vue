<script setup lang="ts">
import FooterNavigation from "@/components/FooterNavigation.vue";
import MainNavigation from "@/components/MainNavigation.vue";
import ScrollUpButton from "@/components/ScrollUpButton.vue";
</script>

<template>
  <div class="d-flex flex-column">
    <MainNavigation />
    <slot />
    <ScrollUpButton />
    <FooterNavigation />
  </div>
</template>

<style scoped></style>
