<script setup>
import { useGlobalStore } from "../stores/global";

const { user } = useGlobalStore();
</script>

<template>
  <div class="py-4">
    <!-- Hero Section -->
    <div class="p-5 mb-5 bg-light rounded-4 border text-center shadow-sm">
      <div class="col-lg-8 mx-auto py-3">
        <span class="badge bg-success-subtle text-success fs-6 mb-3 px-3 py-2">
          <i class="bi bi-heart-pulse-fill me-1"></i>Your Personal Fitness
          Tracker
        </span>
        <h1 class="display-5 fw-bold mb-3">
          Build Consistency, One Workout at a Time
        </h1>
        <p class="lead text-muted mb-4">
          Log your daily routines, track your workout durations, and stay on top
          of your fitness goals with FitApp.
        </p>

        <!-- Buttons when logged OUT -->
        <div
          v-if="!user.email"
          class="d-flex justify-content-center gap-3 flex-wrap">
          <router-link to="/register" class="btn btn-success btn-lg px-4">
            <i class="bi bi-clipboard-check me-1"></i>Get Started
          </router-link>
          <router-link to="/login" class="btn btn-outline-success btn-lg px-4">
            <i class="bi bi-person-fill me-1"></i>Login
          </router-link>
        </div>

        <!-- Buttons when logged IN -->
        <div v-else class="d-flex justify-content-center gap-3 flex-wrap">
          <router-link to="/workouts" class="btn btn-success btn-lg px-4">
            <i class="bi bi-person-walking me-1"></i>View My Workouts
          </router-link>
          <router-link
            to="/add-workout"
            class="btn btn-outline-success btn-lg px-4">
            <i class="bi bi-plus-circle me-1"></i>Add Workout
          </router-link>
        </div>
      </div>
    </div>

    <!-- Feature Highlights -->
    <div class="row g-4 text-center">
      <div class="col-md-4">
        <div class="card h-100 border-0 shadow-sm p-3">
          <div class="card-body">
            <div class="text-success fs-1 mb-2">
              <i class="bi bi-stopwatch"></i>
            </div>
            <h5 class="card-title fw-bold">Track Duration</h5>
            <p class="card-text text-muted">
              Record how long each session takes so you can measure your
              endurance over time.
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card h-100 border-0 shadow-sm p-3">
          <div class="card-body">
            <div class="text-success fs-1 mb-2">
              <i class="bi bi-list-check"></i>
            </div>
            <h5 class="card-title fw-bold">Organize Routines</h5>
            <p class="card-text text-muted">
              Keep all your workouts in one place with clear status tracking
              from pending to completed.
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card h-100 border-0 shadow-sm p-3">
          <div class="card-body">
            <div class="text-success fs-1 mb-2">
              <i class="bi bi-graph-up-arrow"></i>
            </div>
            <h5 class="card-title fw-bold">Stay Accountable</h5>
            <p class="card-text text-muted">
              Simple, distraction-free logging built to help you stick to your
              weekly fitness habits.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
