<script setup lang="ts">
import { axiosInstance } from "@/data/axios";
import { JobItem } from "@/data/model/job-item";
import { useQuery } from "@tanstack/vue-query";
import JobsItem from "./JobsItem.vue";
import { sleep } from "@/utils/utils";

const { data, error, isLoading, refetch } = useQuery({
  queryKey: ["/jobs"],
  queryFn: async () => {
    await sleep(1000);

    return (await axiosInstance.get<JobItem[]>("/jobs")).data;
  },
});
</script>

<template>
  <div class="flex flex-col items-center bg-indigo-50 py-8">
    <p class="mb-6 text-3xl font-bold text-indigo-600">Browse Jobs</p>

    <!-- loading -->
    <div v-show="isLoading" class="flex items-center justify-center">
      Loading...
    </div>
    <!-- error -->
    <div
      @click="refetch()"
      v-show="error"
      class="flex cursor-pointer items-center justify-center"
    >
      {{ error?.message + ", Tap to retry" }}
    </div>
    <div class="grid grid-cols-1 gap-4 px-4 sm:grid-cols-3">
      <JobsItem v-for="job in data" :key="job.id" :job="job" />
    </div>
  </div>
</template>

<style></style>
