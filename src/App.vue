<script setup lang="ts">
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { RouterView } from "vue-router";

const isDev = import.meta.env.DEV;
</script>

<template>
  <RouterView />
  <VueQueryDevtools v-show="isDev" />
</template>
