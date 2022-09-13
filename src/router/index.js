import axios from "axios";
import Vue from "vue";
import VueRouter from "vue-router";

const UsersListView = () =>
  import(/* webpackChunkName: "about" */ "../views/UsersListView.vue");
const NetworkErrorView = () =>
  import(/* webpackChunkName: "about" */ "../views/NetworkErrorView.vue");
const ChartView = () =>
  import(/* webpackChunkName: "about" */ "../views/ChartView.vue");
const NotFoundView = () =>
  import(/* webpackChunkName: "about" */ "../views/NotFoundView.vue");
const LoginView = () =>
  import(/* webpackChunkName: "about" */ "../views/LoginView.vue");
const RegisterView = () =>
  import(/* webpackChunkName: "about" */ "../views/RegisterView.vue");
const DashboardView = () =>
  import(/* webpackChunkName: "about" */ "../views/DashboardView.vue");
const UserView = () =>
  import(/* webpackChunkName: "about" */ "../views/UserView.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardView,
    meta: { reqAuth: true },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/users",
    name: "users",
    component: UsersListView,
    meta: { reqAuth: true },
  },
  {
    path: "/user/:id",
    name: "user",
    component: UserView,
    meta: { reqAuth: true },
    props: true,
  },
  {
    path: "/chart/:coin",
    name: "chart",
    component: ChartView,
    meta: { reqAuth: true },
    props: true,
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFoundView,
    props: true,
    meta: { reqAuth: true },
  },
  {
    path: "/500",
    name: "networkError",
    component: NetworkErrorView,
    meta: { reqAuth: true },
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: NotFoundView,
    meta: { reqAuth: true },
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");
  if (to.meta.reqAuth && !loggedIn) next("/login");
  if ((to.fullPath === "/login" || to.fullPath === "/register") && loggedIn)
    next("/");
  next();
});

export default router;
