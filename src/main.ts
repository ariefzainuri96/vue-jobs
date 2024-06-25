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

const routes = [
  {
    // this is layout
    path: "/",
    name: "DefaultLayout",
    component: DefaultLayout,
    // below children will be rendered inside layout
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: DashboardPage,
      },
      {
        path: "/add-job",
        name: "Add Job",
        component: AddJobPage,
      },
      {
        path: "/jobs",
        name: "Jobs",
        component: JobsPage,
      },
      {
        path: "/jobs/:id",
        name: "Jobs Detail",
        component: JobsDetailPage,
      },
      {
        path: "/edit-job/:id",
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

createApp(App).use(VueQueryPlugin).use(router).mount("#app");
