<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api";
import { Notyf } from "notyf";
const notyf = new Notyf();
const router = useRouter();

const name = ref("");
const duration = ref("");
const submitting = ref(false);
const error = ref("");

async function handleSubmit() {
  submitting.value = true;
  error.value = "";

  try {
    await api.post("/workouts/addWorkout", {
      name: name.value,
      duration: duration.value,
    });

    notyf.success("Workout added successfully");
    router.push("/workouts");
  } catch (err) {
    error.value =
      err.response?.data?.message || "Could not add workout. Please try again.";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="card shadow-sm w-100" style="max-width: 450px">
    <div class="card-body p-4">
      <h3 class="card-title fw-bold text-center mb-4">Add Workout</h3>

      <div v-if="error" class="alert alert-danger py-2">
        {{ error }}
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="workoutName" class="form-label fw-semibold"
            >Workout Name</label
          >
          <input
            id="workoutName"
            v-model.trim="name"
            type="text"
            class="form-control"
            placeholder="e.g., Morning Jog"
            required />
        </div>

        <div class="mb-4">
          <label for="workoutDuration" class="form-label fw-semibold"
            >Duration</label
          >
          <input
            id="workoutDuration"
            v-model.trim="duration"
            type="text"
            class="form-control"
            placeholder="e.g., 30 mins"
            required />
        </div>

        <div class="d-grid gap-2">
          <button
            type="submit"
            class="btn btn-success fw-semibold"
            :disabled="submitting">
            {{ submitting ? "Saving..." : "Save Workout" }}
          </button>
          <router-link to="/workouts" class="btn btn-outline-secondary">
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
