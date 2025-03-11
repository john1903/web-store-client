<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from "vue";
import { PaginationParams } from "@/types/common/paginationParams";

const props = defineProps<{
  size: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "pageChanged", page: PaginationParams): void;
}>();

const currentPage = ref(1);

const isPrevDisabled = computed(() => currentPage.value <= 1);
const isNextDisabled = computed(() => currentPage.value >= props.totalPages);

function prevPage() {
  if (!isPrevDisabled.value) {
    currentPage.value--;
    emit("pageChanged", { page: currentPage.value, size: props.size });
  }
}

function nextPage() {
  if (!isNextDisabled.value) {
    currentPage.value++;
    emit("pageChanged", { page: currentPage.value, size: props.size });
  }
}

function sizeChanged(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit("pageChanged", { page: 1, size: parseInt(target.value) });
}
</script>

<template>
  <div class="pagination-container">
    <span class="pagination-text">Rows per page:</span>
    <select class="pagination-select" @change="sizeChanged($event)">
      <option :value="10">10</option>
      <option :value="15">15</option>
      <option :value="20">20</option>
    </select>
    <span class="pagination-text">
      {{ currentPage }} of {{ props.totalPages }}</span
    >
    <button class="pagination-btn">
      <i
        class="bi bi-chevron-left"
        :disabled="isPrevDisabled"
        @click="prevPage"
      ></i>
    </button>
    <button class="pagination-btn">
      <i
        class="bi bi-chevron-right"
        :disabled="isNextDisabled"
        @click="nextPage"
      ></i>
    </button>
  </div>
</template>

<style scoped>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.pagination-text {
  margin: 0 5px;
}

.pagination-select {
  border: none;
  background: transparent;
  font-size: 14px;
  cursor: pointer;
}

.pagination-btn {
  border: none;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
  color: #666;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
