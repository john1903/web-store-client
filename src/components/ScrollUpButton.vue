<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showButton = ref(false);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function checkScroll() {
  showButton.value = window.scrollY > 100;
}

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<template>
  <transition name="fade">
    <button
      v-if="showButton"
      @click="scrollToTop"
      class="btn btn-white-outline rounded-circle scroll-top"
    >
      <i class="bi bi-arrow-up"></i>
    </button>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.btn-white-outline {
  background-color: #ffffff;
  border: 1px solid #a6a6a6;
  color: #333;
}

.btn-white-outline:hover {
  background-color: #f8f9fa;
  border-color: #686868;
}

.scroll-top {
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 25px;
  right: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  cursor: pointer;
}
</style>
