<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="breadcrumb-custom" aria-label="breadcrumb">
    <span v-for="(item, index) in items" :key="index">
      <template v-if="index < items.length - 1">
        <RouterLink :to="item.to">{{ item.name }}</RouterLink>
      </template>
      <template v-else>
        <RouterLink :to="item.to" class="active">{{ item.name }}</RouterLink>
      </template>
      <span v-if="index < items.length - 1" class="separator">
        <i class="bi bi-chevron-right"></i>
      </span>
    </span>
  </div>
</template>

<style scoped>
.breadcrumb-custom {
  font-size: 16px;
  color: #000;
  cursor: pointer;
}

.breadcrumb-custom a {
  text-decoration: none;
  color: #000;
}

.breadcrumb-custom a.active {
  font-weight: bold;
}

.separator {
  margin: 0 4px;
  color: #aaa;
}
</style>
