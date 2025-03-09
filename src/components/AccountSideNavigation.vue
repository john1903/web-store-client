<script setup lang="ts"></script>

<template>
  <div class="modern-border">
    <RouterLink
      to="/account/profile"
      class="btn-minimal-2 fw-medium list-group-item list-group-item-action p-2 rounded"
    >
      Profile
    </RouterLink>
    <hr class="my-3" />
    <RouterLink
      to="/account/orders"
      class="btn-minimal-2 fw-medium list-group-item list-group-item-action p-2 rounded"
    >
      Orders
    </RouterLink>
    <hr class="my-3" />
    <RouterLink
      to="/account/change-password"
      class="btn-minimal-2 fw-medium list-group-item list-group-item-action p-2 rounded"
    >
      Change password
    </RouterLink>
    <hr class="my-3" />
    <RouterLink
      to="/logout"
      class="logout fw-medium list-group-item list-group-item-action p-2 rounded"
    >
      Logout
    </RouterLink>
  </div>
</template>

<style scoped>
hr {
  border-top: 1px solid #bfbfbf;
}

.logout {
  color: #d9534f !important;
}

.logout:hover {
  background: rgba(217, 83, 79, 0.1);
}
</style>
