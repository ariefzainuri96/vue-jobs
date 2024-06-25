<script setup lang="ts">
import { computed, ref } from "vue";
import MarkerIcon from "vue-material-design-icons/MapMarker.vue";
import Button from "../ui/button/Button.vue";
import { useRouter } from "vue-router";
import { JobItem } from "@/data/responses/jobs-response";

const router = useRouter();
const showMore = ref(false);
const props = defineProps<{
  job: JobItem;
}>();

const description = computed(() => {
  if (showMore.value) {
    return props.job.description;
  }
  return (props.job.description ?? "").slice(0, 100) + "...";
});

// create function to route to detail page
const routeToDetail = () => {
  router.push({
    path: `/jobs/${props.job._id}`,
  });
};
</script>

<template>
  <div class="flex flex-col items-start rounded-md bg-white px-4 py-4">
    <p class="text-sm text-slate-400">{{ props.job.type }}</p>
    <p class="mt-2 text-xl font-bold">{{ props.job.title }}</p>
    <p class="mt-4 text-[16px]">
      {{ description + " "
      }}<span
        @click="showMore = !showMore"
        class="cursor-pointer text-[16px] text-slate-400"
        >{{ showMore ? "Show Less" : "Show More" }}</span
      >
    </p>
    <p class="mt-4 text-sm text-indigo-600">{{ props.job.salary }}</p>
    <div class="mt-2 h-[1px] w-full bg-slate-200" />
    <div class="mt-2 flex flex-row items-center gap-1">
      <marker-icon :size="24" class="icon text-red-600" />
      <p class="text-sm font-semibold text-red-600">{{ props.job.location }}</p>
    </div>
    <Button
      @click="routeToDetail"
      class="mt-4 w-full bg-indigo-600 text-white hover:bg-indigo-700"
      >Read More</Button
    >
  </div>
</template>
