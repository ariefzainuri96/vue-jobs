<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import Navbar from "@/components/Navbar.vue";
import { RouterView, useRouter } from "vue-router";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ref } from "vue";
import { twMerge } from "tailwind-merge";
import Button from "@/components/ui/button/Button.vue";

const isDrawerOpen = ref(false);
const router = useRouter();
</script>

<template>
  <div class="flex h-screen w-screen flex-col overflow-hidden bg-white">
    <Navbar @toggle-drawer="isDrawerOpen = !isDrawerOpen" />
    <RouterView class="w-full flex-1" />
    <Toaster />
    <Sheet :open="isDrawerOpen" @close="isDrawerOpen = false">
      <SheetContent
        :onInteractOutside="() => (isDrawerOpen = false)"
        class="flex flex-col items-start bg-white"
        side="right"
      >
        <Button
          @click="
            () => {
              isDrawerOpen = false;
              router.push('/jobs');
            }
          "
          :class="
            twMerge(
              `rounded-md p-2 text-lg text-black duration-200`,
              $route.path === '/jobs' ? 'bg-black text-white' : '',
            )
          "
        >
          Jobs
        </Button>
        <Button
          @click="
            () => {
              isDrawerOpen = false;
              router.push('/add-job');
            }
          "
          :class="
            twMerge(
              `rounded-md p-2 text-lg text-black duration-200`,
              $route.path === '/add-job' ? 'bg-black text-white' : '',
            )
          "
        >
          Add Job
        </Button>
      </SheetContent>
    </Sheet>
  </div>
</template>
