<script setup lang="ts">
import AddJobForm from "@/components/AddJobForm.vue";
</script>

<template>
  <div
    class="flex h-full flex-col items-center overflow-y-auto bg-blue-50 px-4 py-5"
  >
    <div
      class="flex w-full flex-col items-start rounded-md bg-white p-4 md:max-w-[500px]"
    >
      <p class="self-center text-2xl font-bold">Add Job</p>
      <AddJobForm />
    </div>
  </div>
</template>
