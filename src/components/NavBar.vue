<script setup>
import { ref } from "vue";
import { useGlobalStore } from "../stores/global";
const { user } = useGlobalStore();
</script>

<template>
  <nav
    class="navbar navbar-expand-lg bg-success text-white"
    data-bs-theme="dark">
    <div class="container">
      <a class="navbar-brand fs-3 fw-bold" href="#">FitApp</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto fw-semibold">
          <router-link class="nav-link active" aria-current="page" to="/"
            ><i class="bi bi-house-door me-1"></i>Home</router-link
          >
          <router-link
            class="nav-link active"
            aria-current="page"
            to="/register"
            v-if="!user.email">
            <i class="bi bi-clipboard me-1"></i>
            Register</router-link
          >
          <router-link
            class="nav-link active"
            aria-current="page"
            to="/login"
            v-if="!user.email">
            <i class="bi bi-person-fill me-1"></i>
            Login</router-link
          >
          <router-link
            class="nav-link active"
            aria-current="page"
            to="/workouts"
            v-if="user.email">
            <i class="bi bi-person-walking me-1"></i>
            Workouts</router-link
          >
          <router-link
            class="nav-link active"
            aria-current="page"
            to="/logout"
            v-if="user.email">
            <i class="bi bi-door-open-fill me-1"></i>
            Logout</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>
