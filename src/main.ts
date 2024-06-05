import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import AddPage from "./pages/AddPage.vue";
import DetailPage from "./pages/DetailPage.vue";
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
      { path: "/add", component: AddPage },
      { path: "/detail", component: DetailPage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
