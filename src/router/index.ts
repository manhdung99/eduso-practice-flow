import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UnitView from "../views/UnitView.vue";
import PracticeView from "../views/PracticeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Trang chủ" },
  },
  {
    path: "/unit/:id",
    name: "unit",
    component: UnitView,
    meta: { title: "Chi tiết chương" },
  },
  {
    path: "/practice/:id",
    name: "practice",
    component: PracticeView,
    meta: { title: "Luyện tập" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to) => {
  document.title = (to.meta?.title ?? "Default Title") as string;
});

export default router;
