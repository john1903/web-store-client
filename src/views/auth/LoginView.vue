<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { LoginRequest } from "@/types/security/login";
import { login } from "@/api/authenticationApi";
import { setToken, getExpiry } from "@/utils/security";
import AuthLayout from "@/layouts/AuthLayout.vue";

const router = useRouter();
const toast = useToast();

const loginRequest = reactive<LoginRequest>({
  username: "",
  password: "",
});

const loading = ref(false);

async function onSubmit() {
  loading.value = true;
  try {
    const response = await login(loginRequest);
    if (response.ok) {
      toast.success("Successfully logged in");
      setToken(response.data, getExpiry(response.data));
      await router.push({ name: "home" });
    } else {
      toast.error("Invalid credentials");
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
        <h2 class="fw-bold">Welcome Back</h2>
        <p class="text-muted">Sign in to continue</p>
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
              v-model="loginRequest.username"
              autocomplete="email"
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
              v-model="loginRequest.password"
              autocomplete="current-password"
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
          <span v-else> Sign In </span>
        </button>
      </form>
      <div class="text-center mt-3">
        <RouterLink to="/signup" class="small text-decoration-none">
          Don't have an account? Sign up
        </RouterLink>
        <div class="mt-1">
          <RouterLink to="/" class="small text-decoration-none">
            Back to home
          </RouterLink>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<style scoped></style>
