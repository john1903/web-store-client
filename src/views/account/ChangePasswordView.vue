<script setup lang="ts">
import { ref } from "vue";
import { getJwtPayload, getJwtToken } from "@/utils/security";
import { BearerToken } from "@/types/security/bearerToken";
import { useToast } from "vue-toastification";
import { changePassword } from "@/api/userApi";

const toast = useToast();

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const jwtToken = getJwtToken();
const jwtPayload = getJwtPayload(
  jwtToken ? jwtToken : ({ token: "" } as BearerToken)
);

async function handleChangePassword() {
  if (newPassword.value !== confirmPassword.value) {
    toast.error("Passwords do not match");
    return;
  }
  if (jwtPayload && jwtToken) {
    try {
      const response = await changePassword(
        jwtPayload.id,
        {
          currentPassword: currentPassword.value,
          newPassword: newPassword.value,
        },
        jwtToken
      );
      if (response.ok) {
        toast.success("Password changed");
      } else {
        toast.error("Error changing password");
        console.error(response.error);
      }
    } catch (error) {
      toast.error("Error changing password");
      console.error(error);
    }
  } else {
    toast.error("Error changing password");
  }
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
