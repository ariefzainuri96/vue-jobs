<script setup lang="ts">
import { twMerge } from "tailwind-merge";
</script>

<template>
  <section>
    <div
      class="flex h-16 flex-row items-center justify-between gap-1 bg-indigo-700 px-4"
    >
      <div class="flex flex-1 items-center">
        <router-link to="/" class="text-xl font-bold text-gray-900">
          <img src="../assets/vue.svg" alt="logo" class="h-8 w-8" />
        </router-link>
      </div>
      <router-link
        to="/jobs"
        :class="
          twMerge(
            `rounded-md p-2 text-xl font-bold text-white hover:bg-black`,
            $route.path === '/jobs' ? 'bg-black' : '',
          )
        "
      >
        Jobs
      </router-link>
      <router-link
        to="/add-job"
        :class="
          twMerge(
            `rounded-md p-2 text-xl font-bold text-white hover:bg-black`,
            $route.path === '/add-job' ? 'bg-black' : '',
          )
        "
      >
        Add Job
      </router-link>
    </div>
  </section>
</template>

<style scoped></style>
