<script setup>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import { useGlobalStore } from "./stores/global";
import { onBeforeMount } from "vue";

const { getUserDetails } = useGlobalStore();

onBeforeMount(() => {
  getUserDetails(localStorage.getItem("token"));
});
</script>

<template>
  <div class="app-layout">
    <NavBar />
    <main class="container" :class="{ 'center-view': $route.meta.center }">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main.container {
  flex: 1; /* Pushes the footer to the bottom */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  box-sizing: border-box;
}

main.container.center-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
