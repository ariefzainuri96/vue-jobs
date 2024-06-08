<script setup lang="ts">
import { defineProps } from "vue";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { SelectItem as SelectItemType } from "@/data/model/select-item";

defineProps<{
  label: string;
  placeholder?: string;
  items: SelectItemType[];
  value?: string;
  handleChange?: (value: string) => void;
}>();
</script>

<template>
  <div class="mt-2 flex flex-col">
    <label class="mb-2">{{ label }}</label>
    <Select :model-value="value" @update:model-value="handleChange">
      <SelectTrigger class="w-full rounded-md border-[1px] border-slate-200">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent class="bg-white">
        <SelectGroup>
          <SelectItem
            v-for="(item, index) in items"
            :key="index"
            :value="item.value"
          >
            {{ item.content }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
