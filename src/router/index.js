import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Vocabulary from "../views/Vocabulary.vue"
import About from "../views/About.vue"
import Login from "../views/Login.vue"
import Atlas from "../views/Atlas.vue"
import Post from "../views/ViewPost.vue"
import Users from "../views/Users.vue"



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/atlas",
    name: "atlas",
    component: Atlas,
  },
  {
    path:"/vocabulary",
    name:'vocabulary',
    component:Vocabulary
  },
  {
    path:"/about",
    name:'about',
    component:About
  },
  {
    path:'/post:id',
    name:'post',
    component:Post
  },
  {
    path:'/users',
    name:'users',
    component:Users
  },
  
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
