<script setup lang="ts">
import { ref } from "vue";

type TForm = {
  name?: string;
  age?: number;
};

const form = ref<TForm | null>();
const updateForm = (_form: TForm) => (form.value = _form);

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
        @input="
          (e) =>
            updateForm({
              ...form,
              name: (e.target as HTMLInputElement)?.value,
            })
        "
        placeholder="Enter your name"
      />
    </div>
    <div class="flex flex-col">
      <label for="age">Age</label>
      <input
        type="number"
        :value="form?.age"
        @input="
          (event) =>
            updateForm({
              ...form,
              age: Number((event.target as HTMLInputElement)?.value),
            })
        "
        id="age"
        placeholder="Enter your age"
      />
    </div>

    <button class="rounded-md border-[1px] border-slate-200 p-2" type="submit">
      Submit
    </button>
  </form>
</template>
