<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { expireToken } from "@/utils/security";

const router = useRouter();

onMounted(async () => {
  expireToken();
  await router.push({ name: "home" });
});
</script>
