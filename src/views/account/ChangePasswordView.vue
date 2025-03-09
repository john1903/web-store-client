<script setup lang="ts">
import { ref } from "vue";

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

function handleChangePassword() {
  alert("Change password");
}
</script>

<template>
  <div class="modern-border">
    <div class="row justify-content-center align-items-center">
      <form @submit.prevent="handleChangePassword">
        <div class="mb-3">
          <label for="currentPassword" class="form-label fw-medium"
            >Current Password</label
          >
          <input
            type="password"
            class="form-control"
            id="currentPassword"
            autocomplete="password"
            v-model="currentPassword"
            required
          />
        </div>
        <div class="mb-3">
          <label for="newPassword" class="form-label fw-medium"
            >New Password</label
          >
          <input
            type="password"
            class="form-control"
            id="newPassword"
            autocomplete="password"
            v-model="newPassword"
            required
          />
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label fw-medium"
            >Confirm Password</label
          >
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            autocomplete="password"
            v-model="confirmPassword"
            required
          />
        </div>
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-minimal-2">
            <span>
              <i class="bi bi-floppy mx-1"></i>
              Save
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
