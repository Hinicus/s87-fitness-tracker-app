<script setup>
defineProps({
  workout: {
    type: Object,
    required: true,
  },
});
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
    </div>
  </div>
</template>
