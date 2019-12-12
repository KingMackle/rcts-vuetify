/**eslint disable*/
import Vue from "vue";
import VueRouter from "vue-router";
import { State } from '@/state';

//Import pages
const TrainingSessions = () => import(/* webpackChunkName: "TrainingSessions" */ "@/views/TrainingSessions");
const UserProfile = () => import(/* webpackChunkName: "UserProfile" */ "@/views/UserProfile");
const Login = () => import(/* webpackChunkName: "login" */ "@/views/Login");
const Trainee = () => import(/* webpackChunkName: "Trainee" */ "@/views/Trainee");

Vue.use(VueRouter);

//Add route to each page
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "fallThrough",
      component: TrainingSessions,
      redirect: {
        name: 'Training Sessions'
      }
    },
    {
      path: "/TrainingSessions",
      name: "Training Sessions",
      component: TrainingSessions,
      icon: "mdi-calendar-month",
      showInNavBar: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/UserProfile",
      name: "User Profile",
      component: UserProfile,
      icon: "mdi-account-box",
      showInNavBar: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
        path: "/Trainee",
        name: "Trainee",
        component: Trainee,
        icon: "mdi-calendar-month",
        showInNavBar: true,
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !State.currentUser) {
    next({ path: "/login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
