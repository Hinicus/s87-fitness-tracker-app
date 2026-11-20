import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "notyf/notyf.min.css";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createWebHistory, createRouter } from "vue-router";

//components
import Register from "./pages/Register.vue";
import Login from "./pages/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      //component: HomePage,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: { center: true },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { center: true },
    },
  ],
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
