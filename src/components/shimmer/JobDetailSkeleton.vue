<script setup lang="ts">
import { Skeleton } from "../ui/skeleton";
</script>

<template>
  <div class="w-full flex-1 overflow-y-auto bg-blue-50 p-4">
    <div class="flex flex-col md:grid md:grid-cols-3 md:gap-2">
      <div class="flex flex-col md:col-span-2">
        <div class="w-full rounded-md bg-white p-4">
          <Skeleton class="h-2 w-[150px] bg-slate-100" />
          <Skeleton class="mt-2 h-4 w-[175px] bg-slate-100" />
          <Skeleton class="mt-2 h-2 w-[135px] bg-slate-100" />
        </div>
        <div class="mt-2 w-full rounded-md bg-white p-4">
          <Skeleton class="h-3 w-[150px] bg-slate-100" />
          <Skeleton class="mt-2 h-2 w-full bg-slate-100" />
          <Skeleton class="mt-[ bg-slate-1003px] h-2 w-[90%]" />
          <Skeleton class="mt-[ bg-slate-1003px] h-2 w-[65%]" />
          <Skeleton class="mt-2 h-3 w-[150px] bg-slate-100" />
          <Skeleton class="mt-2 h-2 w-[20%] bg-slate-100" />
        </div>
      </div>

      <div class="mt-2 flex flex-col md:col-span-1 md:mt-0">
        <div class="flex w-full flex-col rounded-md bg-white p-4">
          <Skeleton class="h-3 w-[20%] bg-slate-100" />
          <Skeleton class="mt-3 h-4 w-[30%] bg-slate-100" />
          <Skeleton class="mt-1 h-2 w-[95%] bg-slate-100" />
          <Skeleton class="mt-[ bg-slate-1003px] h-2 w-[90%]" />
          <Skeleton class="mt-[ bg-slate-1003px] h-2 w-[71%]" />
          <div class="mt-2 h-[1px] w-full bg-slate-200" />
          <Skeleton class="mt-2 h-4 w-[31%] bg-slate-100" />
          <Skeleton class="mt-1 h-5 w-full bg-slate-100" />
          <Skeleton class="mt-2 h-4 w-[31%] bg-slate-100" />
          <Skeleton class="mt-1 h-5 w-full bg-slate-100" />
        </div>
      </div>
    </div>
  </div>
</template>
