<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import Navbar from "@/components/Navbar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="flex h-screen w-screen flex-col overflow-hidden bg-white">
    <Navbar />
    <RouterView class="w-full flex-1 overflow-y-auto" />
    <Toaster />
  </div>
</template>
