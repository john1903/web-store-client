<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { UserRequest } from "@/types/users/user";
import { signup } from "@/api/authenticationApi";
import AuthLayout from "@/layouts/AuthLayout.vue";

const toast = useToast();
const router = useRouter();

const userRequest = reactive<UserRequest>({
  email: "",
  phoneNumber: "",
  password: "",
});

const loading = ref(false);

async function onSubmit() {
  loading.value = true;
  try {
    const response = await signup(userRequest);
    if (response.ok) {
      toast.success("Successfully signed up");
      await router.push({ name: "login" });
    } else {
      toast.error(response.error.message);
    }
  } catch (error) {
    toast.error("An error occurred");
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <AuthLayout>
    <div>
      <div class="text-center mb-4">
        <h2 class="fw-bold">Create Account</h2>
        <p class="text-muted">Sign up to continue</p>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="name@example.com"
              v-model="userRequest.email"
              autocomplete="email"
              required
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="phoneNumber" class="form-label">Phone Number</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-telephone"></i>
            </span>
            <input
              type="tel"
              class="form-control"
              id="phoneNumber"
              placeholder="+123456789"
              v-model="userRequest.phoneNumber"
              autocomplete="tel"
              required
            />
          </div>
        </div>
        <div class="mb-4">
          <label for="password" class="form-label">Password</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-lock"></i>
            </span>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Your password"
              v-model="userRequest.password"
              autocomplete="new-password"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-primary w-100 modern-btn"
          :disabled="loading"
        >
          <span v-if="loading">
            <i class="spinner-border spinner-border-sm"></i>
          </span>
          <span v-else> Sign Up </span>
        </button>
      </form>
      <div class="text-center mt-3">
        <RouterLink to="/login" class="small text-decoration-none"
          >Already have an account? Sign in
        </RouterLink>
        <div class="mt-1">
          <RouterLink to="/" class="small text-decoration-none"
            >Back to home</RouterLink
          >
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<style scoped></style>
