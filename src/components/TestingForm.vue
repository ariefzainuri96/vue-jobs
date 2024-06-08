<script setup lang="ts">
import { ref } from "vue";

type TForm = {
  name?: string;
  age?: number;
  size?: number;
};

const form = ref<TForm | null>();

const handleChange = (e: Event) => {
  const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
  form.value = { ...form.value, [name]: value };
};

const submit = () => {
  console.log(form.value);
};
</script>

<template>
  <form class="flex flex-col items-start" @submit.prevent="submit">
    <div class="flex flex-col">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        :value="form?.name"
        @input="handleChange"
        name="name"
        placeholder="Enter your name"
      />
    </div>
    <div class="flex flex-col">
      <label for="age">Age</label>
      <input
        type="number"
        :value="form?.age"
        @input="handleChange"
        name="age"
        id="age"
        placeholder="Enter your age"
      />
    </div>
    <div class="flex flex-col">
      <label for="size">Clothes Size</label>
      <input
        type="number"
        @input="handleChange"
        :value="form?.size"
        name="size"
        id="size"
        placeholder="Enter your size"
      />
    </div>

    <button class="rounded-md border-[1px] border-slate-200 p-2" type="submit">
      Submit
    </button>
  </form>
</template>
