<script setup lang="ts">
import BrowseJobs from "@/components/Jobs/BrowseJobs.vue";
import { ref, watchEffect } from "vue";

const jobsRef = ref<HTMLDivElement | undefined>();

const onScrollEvent = (e: Event) => {
  localStorage.setItem(
    "scrollPositionJobs",
    `${(e.target as HTMLDivElement).scrollTop}`,
  );
};

watchEffect(() => {
  if (localStorage.getItem("scrollPositionJobs") && jobsRef.value) {
    jobsRef.value.scrollTop = parseInt(
      `${localStorage.getItem("scrollPositionJobs")}`,
    );
  }
});
</script>

<template>
  <div
    ref="jobsRef"
    :onScroll="onScrollEvent"
    class="flex flex-col overflow-y-auto bg-blue-50"
  >
    <BrowseJobs :is-home="false" />
  </div>
</template>
