<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>

<template>
  <div class="min-h-screen w-screen overflow-hidden bg-white">
    <div class="flex w-full flex-col overflow-x-hidden">
      <div class="bg-white">
        <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
      </div>
      <main class="flex flex-1 flex-col overflow-y-auto">
        <router-view />
        <Toaster />
      </main>
    </div>
  </div>
</template>
