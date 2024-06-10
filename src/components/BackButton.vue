<script setup lang="ts">
import ArrowLeft from "vue-material-design-icons/ArrowLeft.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <button
    @click="router.back()"
    class="block rounded-full bg-white p-2 sm:hidden"
  >
    <ArrowLeft class="size-4" />
  </button>
</template>
