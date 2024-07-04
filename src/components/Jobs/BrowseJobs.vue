<script setup lang="ts">
import { axiosInstance } from "@/data/axios";
import { useQuery } from "@tanstack/vue-query";
import JobsItem from "./JobsItem.vue";
import BrowseJobSkeleton from "../shimmer/BrowseJobSkeleton.vue";
import { JobsResponse } from "@/data/responses/jobs-response";

const props = defineProps<{
  isHome: boolean;
}>();

const { data, error, isLoading, refetch } = useQuery({
  queryKey: [`${props.isHome ? "/jobs" : "/jobs/browse"}`],
  queryFn: async () => {
    return (await axiosInstance().get<JobsResponse>("/jobs")).data.data;
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
        v-for="job in isHome && (data ?? []).length > 3
          ? data?.slice(data.length - 3, data.length)
          : data"
        :key="job._id"
        :job="job"
      />
    </div>
  </div>
</template>

<style></style>
