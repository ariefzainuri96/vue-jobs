<script setup lang="ts">
import { nextTick, ref } from "vue";
import { useToast } from "./ui/toast/use-toast";
import Button from "./ui/button/Button.vue";
import { twMerge } from "tailwind-merge";

type TItem = {
  msg: string;
};

defineProps<{ msg: string }>();

const { toast } = useToast();
const count = ref(0);
const listItem: TItem[] = [{ msg: "Hello" }, { msg: "World" }, { msg: "Vue" }];

async function updateCount(value: number) {
  count.value += value;
  await nextTick();
  const { dismiss } = toast({
    title: `${value < 0 ? "Decrement" : "Increment"} count`,
    description: `count is now ${count.value}`,
  });

  setTimeout(() => {
    dismiss();
  }, 1000);
}
</script>

<template>
  <div class="flex flex-1 flex-col items-start gap-2 bg-slate-50 p-4">
    <h1
      :class="
        twMerge(
          count > 5
            ? `rounded-sm bg-red-300 font-bold`
            : `rounded-lg bg-blue-300 font-bold`,
          `duration-300`,
        )
      "
    >
      {{ msg }}
    </h1>
    <div class="flex flex-row items-center gap-2">
      <Button
        class="bg-red-200 hover:bg-red-300"
        type="button"
        @click="updateCount(1)"
      >
        Increment
      </Button>
      <p>count is: {{ count }}</p>
      <Button
        class="bg-red-200 hover:bg-red-300"
        type="button"
        @click="updateCount(-1)"
      >
        Decrement
      </Button>
    </div>
    <p
      class="my-2 text-lg font-semibold text-slate-300"
      v-if="count > 5 && count <= 10"
    >
      Awesome
    </p>
    <div class="flex flex-col" v-else-if="count > 10">
      <p class="my-2 text-lg font-semibold text-slate-300">Great</p>
      <li
        :class="
          twMerge(
            `p-2 text-[12px] font-semibold hover:rounded-md hover:bg-slate-200`,
          )
        "
        v-for="({ msg }, index) in listItem"
        :key="index"
      >
        {{ msg }}
      </li>
    </div>
    <div class="size-20 rounded-md bg-slate-300 p-4 pt-2"></div>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
    <p>
      Check out
      <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
        >create-vue</a
      >, the official Vue + Vite starter
    </p>
    <p>
      Install
      <a href="https://github.com/vuejs/language-tools" target="_blank"
        >Volar</a
      >
      in your IDE for a better DX
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
