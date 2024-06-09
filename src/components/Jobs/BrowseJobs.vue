<script setup lang="ts">
import { axiosInstance } from "@/data/axios";
import { JobItem } from "@/data/model/job-item";
import { useQuery } from "@tanstack/vue-query";
import JobsItem from "./JobsItem.vue";
import { sleep } from "@/utils/utils";
import BrowseJobSkeleton from "../shimmer/BrowseJobSkeleton.vue";

const props = defineProps<{
  isHome: boolean;
}>();

const { data, error, isLoading, refetch } = useQuery({
  queryKey: [`${props.isHome ? "/jobs" : "/jobs/browse"}`],
  queryFn: async () => {
    await sleep(1000);

    if (props.isHome) {
      return (await axiosInstance.get<JobItem[]>("/jobs")).data.reverse();
    }

    return (await axiosInstance.get<JobItem[]>("/jobs")).data;
  },
});
</script>

<template>
  <div class="flex flex-col bg-indigo-50 py-8">
    <p class="mb-6 self-center text-3xl font-bold text-indigo-600">
      {{ isHome ? "Recent Jobs" : "Browse Jobs" }}
    </p>

    <!-- loading -->
    <div v-show="isLoading" class="grid grid-cols-1 gap-4 px-4 sm:grid-cols-3">
      <BrowseJobSkeleton v-for="(_, index) in [1, 2, 3]" :key="index" />
    </div>

    <!-- error -->
    <div
      @click="refetch()"
      v-show="error"
      class="flex cursor-pointer items-center justify-center"
    >
      {{ error?.message + ", Tap to retry" }}
    </div>
    <div v-show="data" class="grid grid-cols-1 gap-4 px-4 sm:grid-cols-3">
      <JobsItem
        v-for="job in isHome ? data?.slice(0, 3) : data"
        :key="job.id"
        :job="job"
      />
    </div>
  </div>
</template>

<style></style>
