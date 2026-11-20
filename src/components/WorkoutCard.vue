<script setup>
import { Notyf } from "notyf";
import api from "../api";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGlobalStore } from "../stores/global";
const store = useGlobalStore();
const notyf = new Notyf();

const props = defineProps({
  workout: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["deleted"]);
const deleting = ref(false);

const route = useRoute();
const router = useRouter();
async function deleteWorkout(id) {
  try {
    deleting.value = true;
    let res = await api.delete(`/workouts/deleteWorkout/${id}`);
    if (res.status === 200) {
      notyf.success("Workout Deleted Successfully");

      emit("deleted", id);
    }
  } catch (e) {
    if (e.response?.data) {
      notyf.error("Error! Could not delete workout");
    }
  } finally {
    deleting.value = false;
  }
}

async function updateWorkout(id) {
  store.setSelectedWorkout(props.workout);
  router.push(`/updateWorkout/${id}`);
}
</script>

<template>
  <div class="card h-100 shadow-sm border-success-subtle">
    <div class="card-body d-flex flex-column">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="card-title fw-bold mb-0">{{ workout.name }}</h5>
        <span
          class="badge"
          :class="
            workout.status?.toLowerCase() === 'completed'
              ? 'bg-success'
              : 'bg-warning text-dark'
          ">
          {{ workout.status || "Pending" }}
        </span>
      </div>

      <p class="card-text text-muted mb-0 mt-auto">
        <i class="bi bi-clock me-1"></i>Duration:
        <strong class="text-dark">{{ workout.duration }}</strong>
      </p>

      <div class="ms-auto d-flex gap-2">
        <button
          class="btn btn-sm btn-success"
          @click="updateWorkout(workout._id)">
          <i class="bi bi-pencil me-1"></i>
          Edit
        </button>
        <button
          class="btn btn-sm btn-danger"
          :disabled="deleting"
          @click="deleteWorkout(workout._id)">
          <i class="bi bi-trash me-1"></i>
          {{ deleting ? "Deleting..." : "Delete" }}
        </button>
      </div>
    </div>
  </div>
</template>
