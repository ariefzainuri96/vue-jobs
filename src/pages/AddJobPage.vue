<script setup lang="ts">
import JobForm from "@/components/JobForm.vue";
import { axiosInstance } from "@/data/axios";
import { JobItem } from "@/data/model/job-item";
import { sleep } from "@/utils/utils";
import { showSimpleToast } from "@/utils/utils";
import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";

const router = useRouter();

const { isPending, error, mutate } = useMutation({
  mutationKey: ["/jobs"],
  mutationFn: async (job) => {
    await sleep(1000);
    const data = (await axiosInstance.post<JobItem>("/jobs", job)).data;
    return data;
  },
  onSuccess: (data) => {
    showSimpleToast({
      title: "Success!",
      description: `Berhasil membuat job ${data?.title}`,
    });

    router.push("/jobs");
  },
  onError: (e) => {
    showSimpleToast({
      title: "Error!",
      description: `${e}`,
    });
  },
});

const submitForm = (jobForm: JobItem) => {
  mutate(JSON.parse(JSON.stringify(jobForm)));
};
</script>

<template>
  <div
    class="flex h-full flex-col items-center overflow-y-auto bg-blue-50 px-4 py-5"
  >
    <div
      class="flex w-full flex-col items-start rounded-md bg-white p-4 md:max-w-[500px]"
    >
      <p class="self-center text-2xl font-bold">Add Job</p>
      <JobForm
        @submit-form="submitForm"
        :pending="isPending"
        :error-message="error?.message"
      />
    </div>
  </div>
</template>
