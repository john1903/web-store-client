import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { isAuthenticated, hasRole } from "@/utils/security";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/LoginView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/auth/SignupView.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("@/views/auth/LogoutView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (["login", "signup"].includes(to.name as string) && isAuthenticated()) {
    return next({ name: "home" });
  }
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return next({ name: "login" });
  }
  if (to.meta.requiresRole) {
    if (!isAuthenticated()) {
      return next({ name: "login" });
    }
    if (
      typeof to.meta.requiresRole === "string" &&
      !hasRole(to.meta.requiresRole)
    ) {
      return next(from.name ? { name: from.name } : { name: "home" });
    }
  }
  next();
});

export default router;
