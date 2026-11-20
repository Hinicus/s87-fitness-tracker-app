<template>
  <div class="d-flex flex-column shadow rounded p-5 w-50">
    <div class="text-center">
      <h1 class="fw-semibold">FitApp</h1>
      <h3>Login</h3>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group mb-3">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp
          "
          v-model="email" />
      </div>
      <div class="form-group mb-3">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="password" />
      </div>
      <button
        type="submit"
        class="btn btn-primary align-items-end"
        v-if="isEnabled">
        Login
      </button>
      <button
        type="submit"
        class="btn btn-danger align-items-end disabled"
        v-else>
        Login
      </button>
    </form>
    <p class="text-center mt-3">
      New User? <router-link to="/register">Register</router-link>
    </p>
  </div>
</template>

<script setup>
import { useGlobalStore } from "../stores/global";
const { user, getUserDetails } = useGlobalStore();
import { onBeforeMount, ref, watch } from "vue";
import { Notyf } from "notyf";
const notyf = new Notyf();

import api from "../api";

import { useRouter } from "vue-router";
const router = useRouter();

//input states
const email = ref("");
const password = ref("");
const isEnabled = ref(false);

watch([email, password], (currentValue) => {
  if (currentValue.every((input) => input !== "")) {
    isEnabled.value = true;
  } else {
    isEnabled.value = false;
  }
});

async function handleSubmit() {
  try {
    let res = await api.post("/users/login", {
      email: email.value,
      password: password.value,
    });

    if (res.status === 200) {
      notyf.success("Successfully Logged in");

      localStorage.setItem("token", res.data.access);
      console.log(res.data.access);
      getUserDetails(res.data.access);

      email.value = "";
      password.value = "";

      router.push("/workouts");
    } else {
      notyf.error("Login Failed!");
    }
  } catch (error) {
    console.log(error.response?.status);
    if (
      error.response?.status === 404 ||
      error.response?.status === 401 ||
      error.response?.status === 400 ||
      error.response?.status === 409
    ) {
      notyf.error(e.response?.data);
    } else {
      console.error(e);
      notyf.error("Login Failed. Please contact administrator.");
    }
  }
}

onBeforeMount(() => {
  if (user.token) {
    router.push({ path: "/workouts" });
  }
});
</script>
