<template>
  <div class="d-flex flex-column shadow rounded p-5 w-50">
    <div class="text-center">
      <h1 class="fw-semibold">FitApp</h1>
      <h3>Register</h3>
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
        Register
      </button>
      <button
        type="submit"
        class="btn btn-danger align-items-end disabled"
        v-else>
        Register
      </button>
    </form>
    <p class="text-center mt-3">
      Registered User? <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script setup>
import { useGlobalStore } from "../stores/global";
const { user } = useGlobalStore();
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
    let res = await api.post("/users/register", {
      email: email.value,
      password: password.value,
    });

    if (res.status === 201) {
      notyf.success("Successfully Registered");

      email.value = "";
      password.value = "";

      router.push("/login");
    } else {
      notyf.error("Registration Failed!");
    }
  } catch (e) {
    if (
      e.response.status === 404 ||
      e.response.status === 401 ||
      e.response.status === 400 ||
      e.response.status === 409
    ) {
      notyf.error(e.response.data.message);
    } else {
      console.error(e);
      notyf.error("Registration Failed. Please contact administrator.");
    }
  }
}

onBeforeMount(() => {
  if (user.token) {
    router.push({ path: "/workouts" });
  }
});
</script>
