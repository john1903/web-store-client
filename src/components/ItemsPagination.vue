<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, computed, onMounted } from "vue";
import { PaginationParams } from "@/common/commonImports";

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

onMounted(() => {
  if (props.totalPages === 0) {
    currentPage.value = 0;
  }
});

watch(
  () => props.totalPages,
  (newTotal) => {
    if (currentPage.value > newTotal) {
      currentPage.value = newTotal;
    } else {
      currentPage.value = 1;
    }
  }
);
</script>

<template>
  <div
    class="d-flex justify-content-center align-items-center pagination-custom"
  >
    <div
      class="arrow me-3"
      :class="{ 'arrow-disabled': isPrevDisabled }"
      @click="prevPage"
    >
      <i class="bi bi-arrow-left"></i>
    </div>
    <span class="page-info"> Page {{ currentPage }} of {{ totalPages }} </span>
    <div
      class="arrow ms-3"
      :class="{ 'arrow-disabled': isNextDisabled }"
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
