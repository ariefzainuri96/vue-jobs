<script setup lang="ts">
import ActiondashboardCard from "@/components/ActionDashboardCard.vue";
import BrowseJobs from "@/components/Jobs/BrowseJobs.vue";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const divRef = ref<HTMLDivElement | undefined>();
const onAddJobClick = () => router.push("add-job");
const onBrowseJobsClick = () => router.push("jobs");

const onScrollEvent = (e: Event) => {
  localStorage.setItem(
    "scrollPosition",
    `${(e.target as HTMLDivElement).scrollTop}`,
  );
};

watchEffect(() => {
  if (localStorage.getItem("scrollPosition") && divRef.value) {
    divRef.value.scrollTop = parseInt(
      `${localStorage.getItem("scrollPosition")}`,
    );
  }
});
</script>

<template>
  <!-- column -->
  <div
    ref="divRef"
    :onScroll="onScrollEvent"
    class="flex flex-col overflow-y-auto"
  >
    <!-- hero -->
    <section>
      <div
        class="flex flex-col items-center justify-center gap-4 bg-indigo-700 py-24"
      >
        <h1 class="text-center text-6xl font-extrabold text-white">
          Become a Vue Dev
        </h1>
        <p class="text-center text-lg text-white">
          Find the Vue job that fits your skills and experience.
        </p>
      </div>
    </section>
    <!-- actions -->
    <section class="mt-6">
      <div class="mx-4 grid grid-cols-2 gap-3">
        <ActiondashboardCard
          className="bg-slate-200"
          class="bg-slate-600 hover:bg-slate-700"
          title="For Developers"
          description="Browse our Vue jobs and start your career as a Vue developer."
          actionTitle="Browse Jobs"
          :onActionClick="onBrowseJobsClick"
        />
        <ActiondashboardCard
          className="bg-indigo-100"
          class="bg-indigo-600 hover:bg-indigo-700"
          title="For Employers"
          description="List your job to find the perfect developer for the role"
          actionTitle="Add Job"
          :onActionClick="onAddJobClick"
        />
      </div>
    </section>
    <!-- jobs -->
    <section class="mt-6">
      <BrowseJobs :is-home="true" />
    </section>
  </div>
</template>
<script></script>
