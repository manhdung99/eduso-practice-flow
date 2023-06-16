import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UnitView from "../views/UnitView.vue";
import PracticeView from "../views/PracticeView.vue";
import WorkbookView from "../views/WorkbookView.vue";
import HistoryView from "../views/PracticeHistory.vue";
import TestVue from "../views/TestVue.vue";

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
  {
    path: "/workbook/:id",
    name: "workbook",
    component: WorkbookView,
    meta: { title: "Tổng kết" },
  },
  {
    path: "/history/:id",
    name: "history",
    component: HistoryView,
    meta: { title: "Lịch sử luyện tập" },
  },
  {
    path: "/test",
    name: "test",
    component: TestVue,
    meta: { title: "Lịch sử luyện tập" },
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
