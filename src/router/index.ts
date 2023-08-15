import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CourseView from "../views/CourseView.vue";
import LessonView from "../views/LessonView.vue";
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
    path: "/course/:courseId",
    name: "courseview",
    component: CourseView,
    meta: { title: "Chi tiết chương" },
  },
  {
    path: "/course/:courseId/:lessonId",
    name: "lesson",
    component: LessonView,
    meta: { title: "Chi tiết chương" },
  },
  {
    path: "/lesson/:id",
    name: "lessonview",
    component: LessonView,
    meta: { title: "Chi tiết chương" },
  },
  {
    path: "/practice/:courseId/:id",
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
    path: "/history/:courseId/:id",
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
