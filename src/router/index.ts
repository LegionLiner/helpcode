import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Featured from "../views/Featured.vue";
import Courses from "../views/Courses.vue";
import Course from "../views/Course.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/profile",
    children: [
      {
        path: "",
        name: "profile",
        component: Profile,
      },
      {
        path: "featured",
        name: "featured",
        component: Featured,
      },
    ],
  },
  {
    path: "/courses",
    name: "courses",
    component: Courses,
  },
  {
    path: "/course/:id",
    name: "course",
    component: Course,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (from.path == "/courses") {
      return;
    }
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
