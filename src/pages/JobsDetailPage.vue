<script setup lang="ts">
import { axiosInstance } from "@/data/axios";
import { JobItem } from "@/data/model/job-item";
import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import MarkerIcon from "vue-material-design-icons/MapMarker.vue";
import { sleep } from "@/utils/utils";

const route = useRoute();

const { data, error, isLoading, refetch } = useQuery({
  queryKey: ["/jobs", route.params.id],
  queryFn: async () => {
    await sleep(1000);
    return (await axiosInstance.get<JobItem>(`/jobs/${route.params.id}`)).data;
  },
});
</script>

<template>
  <div v-show="isLoading">Loading...</div>
  <div v-show="error" @click="refetch()" v-if="error">
    {{ error?.message + ", Tap to retry" }}
  </div>
  <div
    v-show="data"
    class="flex flex-col gap-2 overflow-y-auto bg-blue-50 p-4 sm:grid sm:grid-cols-3"
  >
    <!-- left column -->
    <div class="flex flex-col gap-2 sm:col-span-2">
      <div class="w-full rounded-md bg-white p-4">
        <p class="text-sm text-slate-400">{{ data?.type }}</p>
        <p class="mt-2 text-2xl font-bold">{{ data?.title }}</p>
        <p class="mt-4 flex flex-row items-center text-[12px] text-red-600">
          <marker-icon :size="20" />{{ " " + data?.location }}
        </p>
      </div>
      <div class="flex w-full flex-col gap-3 rounded-md bg-white p-4"></div>
    </div>
    <!-- right column -->
    <div class="flex flex-col gap-2 sm:col-span-1">
      <div class="flex w-full flex-col gap-3 rounded-md bg-white p-4"></div>
      <div class="flex w-full flex-col gap-3 rounded-md bg-white p-4"></div>
    </div>
  </div>
</template>

<style></style>
