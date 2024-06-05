<script setup lang="ts">
import HelloWorld from "../components/HelloWorld.vue";
import TestingForm from "../components/TestingForm.vue";
</script>

<template>
  <div class="flex flex-col">
    <HelloWorld msg="Vite + Vue" />
    <TestingForm />
    <div class="mt-2 flex flex-row gap-2 overflow-x-auto">
      <RouterLink class="rounded-md bg-red-200 p-2" to="/add">Add</RouterLink>
      <RouterLink class="rounded-md bg-red-400 p-2" to="/detail"
        >Detail</RouterLink
      >
    </div>
  </div>
</template>

<style scoped></style>
