<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const props = defineProps<{
  className?: string;
  class?: string;
  title: string;
  description: string;
  actionTitle: string;
  onActionClick: () => void;
}>();
</script>

<template>
  <div
    :class="
      twMerge(
        `flex flex-col items-start gap-3 rounded-lg p-4 shadow-md`,
        props.className,
      )
    "
  >
    <p class="text-xl font-bold">{{ props.title }}</p>
    <p class="line-clamp-1 text-wrap text-[16px]">{{ props.description }}</p>
    <button
      @click="props.onActionClick"
      :class="twMerge(`rounded-md px-4 py-2 text-white`, props.class)"
    >
      {{ props.actionTitle }}
    </button>
  </div>
</template>
