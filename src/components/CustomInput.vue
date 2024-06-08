<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  variant: "area" | "input";
  label: string;
  //   handleChange?: (e: Event) => void;
}>();
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <div class="mt-2 flex flex-col">
    <label class="mb-2">{{ label }}</label>
    <input
      v-bind="$attrs"
      class="rounded-md border-[1px] border-slate-200 p-2"
      v-show="variant === 'input'"
    />
    <textarea
      v-bind="$attrs"
      class="rounded-md border-[1px] border-slate-200 p-2"
      v-show="variant === 'area'"
    />
  </div>
</template>
