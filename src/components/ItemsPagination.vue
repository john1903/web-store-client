<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { PaginationParams } from "@/common/commonImports";

const props = defineProps<{
  size: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "pageChanged", page: PaginationParams): void;
}>();

const currentPage = ref(1);

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    emit("pageChanged", { page: currentPage.value, size: props.size });
  }
}

function nextPage() {
  if (currentPage.value < props.totalPages) {
    currentPage.value++;
    emit("pageChanged", { page: currentPage.value, size: props.size });
  }
}
</script>

<template>
  <div
    class="d-flex justify-content-center align-items-center pagination-custom"
  >
    <div
      class="arrow me-3"
      :class="{ 'arrow-disabled': currentPage === 1 }"
      @click="prevPage"
    >
      <i class="bi bi-arrow-left"></i>
    </div>

    <span class="page-info"> Page {{ currentPage }} of {{ totalPages }} </span>

    <div
      class="arrow ms-3"
      :class="{ 'arrow-disabled': currentPage >= Number(totalPages) }"
      @click="nextPage"
    >
      <i class="bi bi-arrow-right"></i>
    </div>
  </div>
</template>

<style scoped>
.pagination-custom {
  padding: 1rem 0;
}

.arrow {
  font-size: 1.5rem;
  cursor: pointer;
  color: #000;
  transition: color 0.3s ease;
  user-select: none;
}

.arrow:hover {
  color: #333;
}

.arrow-disabled {
  color: #ccc;
  cursor: not-allowed;
}

.page-info {
  font-size: 1rem;
  font-weight: 500;
}
</style>
