<script setup lang="ts">
import Skeleton from "../ui/skeleton/Skeleton.vue";
</script>

<template>
  <div class="flex flex-col rounded-xl bg-white shadow-md">
    <div class="p-4">
      <div class="mb-6">
        <Skeleton class="my-2 h-3 w-[150px] bg-slate-100" />
        <Skeleton class="h-3 w-[150px] bg-slate-100 text-xl" />
      </div>

      <Skeleton class="mb-1 h-3 w-full bg-slate-100" />
      <Skeleton class="h-3 w-[230px] bg-slate-100" />

      <Skeleton class="mb-2 mt-4 h-3 w-[170px] bg-slate-100 text-indigo-500" />

      <div class="mb-5 border border-gray-100"></div>

      <Skeleton class="mb-4 h-3 w-[120px] bg-slate-100" />
      <Skeleton class="mb-4 h-[36px] w-full bg-slate-100 py-2" />
    </div>
  </div>
</template>
