<script setup lang="ts">
import { JobItem } from "@/data/model/job-item";
import { computed, ref } from "vue";

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
  </div>
</template>
