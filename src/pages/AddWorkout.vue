<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useGlobalStore } from "../stores/global";
import api from "../api";
import { Notyf } from "notyf";
const notyf = new Notyf();
const router = useRouter();
const route = useRoute();
const store = useGlobalStore();

const name = ref("");
const duration = ref("");
const submitting = ref(false);
const error = ref("");

const isUpdating = computed(() => Boolean(route.params.id));

onMounted(async () => {
  if (!isUpdating.value) {
    store.setSelectedWorkout(null);
    return;
  } else if (isUpdating.value) {
    if (
      store.selectedWorkout &&
      store.selectedWorkout._id === route.params.id
    ) {
      name.value = store.selectedWorkout.name;
      duration.value = store.selectedWorkout.duration;
      return;
    }

    // 2. Fallback if the user refreshed the browser on /updateWorkout/:id
    try {
      const { data } = await api.get("/workouts/getMyWorkouts");
      const list = Array.isArray(data) ? data : data.workouts || [];
      const found = list.find((w) => w._id === route.params.id);

      if (found) {
        name.value = found.name;
        duration.value = found.duration;
      } else {
        error.value = "Workout not found.";
      }
    } catch (err) {
      error.value = "Failed to load workout details.";
    }
  }
});

async function handleSubmit(id) {
  submitting.value = true;
  error.value = "";
  try {
    if (isUpdating.value) {
      await api.patch(`/workouts/updateWorkout/${id}`, {
        name: name.value,
        duration: duration.value,
      });
    } else {
      await api.post("/workouts/addWorkout", {
        name: name.value,
        duration: duration.value,
      });
    }

    notyf.success(
      `Workout ${isUpdating.value ? "updated" : "added"} successfully`,
    );
    store.setSelectedWorkout(null);
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
      <h3 class="card-title fw-bold text-center mb-4">
        {{ isUpdating.value ? "Update Workout" : "Add Workout" }}
      </h3>

      <div v-if="error" class="alert alert-danger py-2">
        {{ error }}
      </div>

      <form @submit.prevent="handleSubmit(route.params.id)">
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
            v-if="!isUpdating.value"
            type="submit"
            class="btn btn-success fw-semibold"
            :disabled="submitting">
            {{ submitting ? "Saving..." : "Save Workout" }}
          </button>
          <button
            v-else
            type="submit"
            class="btn btn-success fw-semibold"
            :disabled="submitting">
            {{ submitting ? "Updating..." : "Update Workout" }}
          </button>
          <router-link to="/workouts" class="btn btn-outline-secondary">
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
