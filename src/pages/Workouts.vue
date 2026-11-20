<script setup>
import { ref, onMounted } from "vue";
import api from "../api";
import WorkoutCard from "../components/WorkoutCard.vue";

const workouts = ref([]);
const loading = ref(true);
const error = ref("");

async function fetchWorkouts() {
  loading.value = true;
  error.value = "";
  try {
    const { data } = await api.get("/workouts/getMyWorkouts");
    workouts.value = Array.isArray(data) ? data : data.workouts || [];
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to load  workouts.";
  } finally {
    loading.value = false;
  }
}

function removeWorkoutFromList(deletedId) {
  workouts.value = workouts.value.filter((w) => w._id !== deletedId);
}

onMounted(fetchWorkouts);
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold mb-0">My Workouts</h2>
      <router-link to="/addWorkouts" class="btn btn-success">
        <i class="bi bi-plus-circle me-1"></i>Add Workout
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-success" role="status"></div>
    </div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-else-if="workouts.length === 0" class="text-center py-5 text-muted">
      <p class="fs-5 mb-2">No workouts found yet.</p>
      <router-link to="/addWorkouts" class="btn btn-outline-success">
        Create your first workout
      </router-link>
    </div>

    <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div
        class="col"
        v-for="(workout, index) in workouts"
        :key="workout._id || index">
        <WorkoutCard :workout="workout" @deleted="removeWorkoutFromList" />
      </div>
    </div>
  </div>
</template>
