import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import AddJobPage from "./pages/AddJobPage.vue";
import JobsPage from "./pages/JobsPage.vue";
import DashboardPage from "./pages/DashboardPage.vue";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    // this is layout
    path: "/",
    component: DefaultLayout,
    // this is children
    children: [
      { path: "/", component: DashboardPage },
      { path: "/add-job", component: AddJobPage },
      { path: "/jobs", component: JobsPage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
