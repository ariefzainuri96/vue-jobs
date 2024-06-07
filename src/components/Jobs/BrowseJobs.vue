<script setup lang="ts">
import { axiosInstance } from "@/data/axios";
import { JobItem } from "@/data/model/job-item";
import { useQuery } from "@tanstack/vue-query";
import JobsItem from "./JobsItem.vue";

const { data, error, isLoading } = useQuery({
  queryKey: ["/jobs"],
  queryFn: async () => {
    return (await axiosInstance.get<JobItem[]>("/jobs")).data;
  },
});
</script>

<template>
  <div class="flex flex-col items-center bg-indigo-100 py-8">
    <p class="mb-6 text-2xl font-bold text-indigo-600">Browse Jobs</p>

    <!-- loading -->
    <div v-show="isLoading" class="flex items-center justify-center">
      Loading...
    </div>
    <!-- error -->
    <div v-show="error" class="flex items-center justify-center">
      {{ error?.message }}
    </div>
    <div class="grid grid-cols-1 gap-4 px-4 sm:grid-cols-3">
      <JobsItem v-for="job in data" :key="job.id" :job="job" />
    </div>
  </div>
</template>

<style></style>
