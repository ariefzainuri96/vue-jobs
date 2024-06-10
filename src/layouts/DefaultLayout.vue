<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import Navbar from "@/components/Navbar.vue";
import { RouterView } from "vue-router";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ref } from "vue";

const isDrawerOpen = ref(false);
</script>

<template>
  <div class="flex h-screen w-screen flex-col overflow-hidden bg-white">
    <Navbar @toggle-drawer="isDrawerOpen = !isDrawerOpen" />
    <RouterView class="w-full flex-1" />
    <Toaster />
    <Sheet :open="isDrawerOpen" @close="isDrawerOpen = false">
      <SheetContent class="bg-white" side="right">
        <p>This is Drawer</p>
        <button @click="isDrawerOpen = false">Close</button>
      </SheetContent>
    </Sheet>
  </div>
</template>
