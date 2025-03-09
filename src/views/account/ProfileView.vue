<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchUser } from "@/api/userApi";
import { User } from "@/types/users/user";
import { getJwtPayload, getJwtToken } from "@/common/commonImports";
import { BearerToken } from "@/types/security/bearerToken";
import { useToast } from "vue-toastification";

const toast = useToast();

const user = ref<User>({
  id: 0,
  email: "",
  phoneNumber: "",
} as User);
const editing = ref(false);

const jwtToken = getJwtToken();
const jwtPayload = getJwtPayload(
  jwtToken ? jwtToken : ({ token: "" } as BearerToken)
);

async function handleUpdateUser() {
  alert("Save changes");
  editing.value = false;
}

onMounted(async () => {
  if (jwtPayload && jwtToken) {
    try {
      const response = await fetchUser(jwtPayload.id, jwtToken);
      if (response.ok) {
        user.value = response.data;
      } else {
        toast.error("Error fetching user");
        console.error(response.error);
      }
    } catch (error) {
      toast.error("Error fetching user");
      console.error(error);
    }
  } else {
    toast.error("Error fetching user");
  }
});
</script>

<template>
  <div class="modern-border">
    <div class="row justify-content-center align-items-center">
      <form @submit.prevent="handleUpdateUser">
        <div class="mb-3">
          <label for="email" class="form-label fw-medium">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            autocomplete="email"
            v-model="user.email"
            required
            :disabled="!editing"
          />
        </div>
        <div class="mb-3">
          <label for="phoneNumber" class="form-label fw-medium"
            >Phone Number</label
          >
          <input
            type="tel"
            class="form-control"
            id="phoneNumber"
            autocomplete="tel"
            v-model="user.phoneNumber"
            required
            :disabled="!editing"
          />
        </div>
        <div class="d-flex justify-content-center">
          <button
            v-if="!editing"
            type="button"
            class="btn btn-minimal-2 mx-1"
            @click="editing = true"
          >
            <span>
              <i class="bi bi-pencil mx-1"></i>
              Edit
            </span>
          </button>
          <div v-else class="d-flex">
            <button type="submit" class="btn btn-minimal-2">
              <span>
                <i class="bi bi-floppy mx-1"></i>
                Save
              </span>
            </button>
            <button
              type="button"
              class="btn btn-minimal-2"
              @click="editing = false"
            >
              <span>
                <i class="bi bi-x-lg mx-1"></i>
                Cancel
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
