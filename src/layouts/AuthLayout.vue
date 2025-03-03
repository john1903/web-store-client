<template>
  <div class="h-100 d-flex align-items-center justify-content-center bg-light">
    <div class="card p-4 shadow-sm border-0 modern-card-2">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.modern-card-2 {
  border-radius: 15px;
  max-width: 400px;
  width: 95%;
}
</style>
