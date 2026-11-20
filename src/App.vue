<script setup>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <NavBar />
  <main class="container">
    <RouterView />
  </main>
  <Footer />
</template>
