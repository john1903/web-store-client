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
    path: "/products",
    name: "products",
    component: () => import("@/views/products/ProductsView.vue"),
    props: (route) => ({
      paginationParams: {
        page: route.query.page ? Number(route.query.page) - 1 : undefined,
        size: route.query.size ? Number(route.query.size) : 12,
      },
      productsFilters: {
        categoryId: route.query.categoryId
          ? Number(route.query.categoryId)
          : undefined,
        name: route.query.name ? String(route.query.name) : undefined,
        priceFrom: route.query.priceFrom
          ? Number(route.query.priceFrom)
          : undefined,
        priceTo: route.query.priceTo ? Number(route.query.priceTo) : undefined,
      },
    }),
  },
  {
    path: "/products/:id",
    name: "product",
    component: () => import("@/views/products/ProductView.vue"),
    props: (route) => ({
      id: Number(route.params.id),
    }),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/cart/CartView.vue"),
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
