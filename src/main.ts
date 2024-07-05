import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import AddJobPage from "./pages/AddJobPage.vue";
import JobsPage from "./pages/JobsPage.vue";
import DashboardPage from "./pages/dashboard/DashboardPage.vue";
import JobsDetailPage from "./pages/JobsDetailPage.vue";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import { createRouter, createWebHistory } from "vue-router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import EditJobPage from "./pages/EditJobPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";

const beforeEnterReturn = (to) => {
  const userStorage = localStorage.getItem("user");

  if (userStorage) {
    console.log(
      `route to login or register but user is already logged in ${to.path}`,
    );

    return {
      name: "Dashboard",
      hash: to.hash,
      query: to.query,
    };
  }
};

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    beforeEnter: (to) => beforeEnterReturn(to),
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
    beforeEnter: (to) => beforeEnterReturn(to),
  },
  {
    // this is layout
    path: "/",
    component: DefaultLayout,
    meta: {
      requiresAuth: true,
    },
    // below children will be rendered inside layout
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: DashboardPage,
      },
      {
        path: "add-job",
        name: "Add Job",
        component: AddJobPage,
      },
      {
        path: "jobs",
        name: "Jobs",
        component: JobsPage,
      },
      {
        path: "jobs/:id",
        name: "Jobs Detail",
        component: JobsDetailPage,
      },
      {
        path: "edit-job/:id",
        name: "Edit Jobs",
        component: EditJobPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const userStorage = localStorage.getItem("user");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!userStorage && to.path !== "/login") {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

createApp(App).use(VueQueryPlugin).use(router).mount("#app");
