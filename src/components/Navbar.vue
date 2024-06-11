<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import Menu from "vue-material-design-icons/Menu.vue";
</script>

<template>
  <section>
    <div
      class="flex h-16 flex-row items-center justify-between gap-1 bg-indigo-700 px-4"
    >
      <div class="flex flex-1 flex-row items-center gap-4">
        <router-link to="/" class="text-xl font-bold text-gray-900">
          <img src="../assets/vue.svg" alt="logo" class="h-8 w-8" />
        </router-link>
        <p class="flex-1 text-2xl font-bold text-white">Vue Jobs</p>
      </div>
      <button class="block sm:hidden" @click="$emit('toggle-drawer')">
        <Menu class="size-4 text-white" />
      </button>
      <router-link
        to="/jobs"
        :class="
          twMerge(
            `hidden rounded-md p-2 text-lg text-white duration-200 hover:bg-black sm:block`,
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
            `hidden rounded-md p-2 text-lg text-white duration-200 hover:bg-black sm:block`,
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
