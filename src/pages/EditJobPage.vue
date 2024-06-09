<script setup lang="ts">
import JobForm from "@/components/JobForm.vue";
import { axiosInstance } from "@/data/axios";
import { JobItem } from "@/data/model/job-item";
import { sleep } from "@/utils/utils";
import { showSimpleToast } from "@/utils/utils";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const { isPending, error, mutate } = useMutation({
  mutationKey: ["/jobs"],
  mutationFn: async (job: JobItem) => {
    await sleep(1000);
    const data = (
      await axiosInstance.put<JobItem>(
        `/jobs/${job?.id}`,
        JSON.parse(JSON.stringify(job)),
      )
    ).data;
    return data;
  },
  onSuccess: (data) => {
    showSimpleToast({
      title: "Success!",
      description: `Berhasil memperbarui job ${data?.title}`,
    });

    router.back();
  },
  onError: (e) => {
    showSimpleToast({
      title: "Error!",
      description: `${e}`,
    });
  },
});

const { data, isError, isLoading, refetch } = useQuery({
  queryKey: ["/jobs", route.params.id],
  queryFn: async ({ signal }) => {
    await sleep(1000);
    return (
      await axiosInstance.get<JobItem>(`/jobs/${route.params.id}`, {
        signal,
      })
    ).data;
  },
});
</script>

<template>
  <div
    class="flex h-full flex-col items-center overflow-y-auto bg-blue-50 px-4 py-5"
  >
    <div
      class="flex w-full flex-col items-start rounded-md bg-white p-4 md:max-w-[500px]"
    >
      <div v-show="isLoading">Loading...</div>
      <div v-show="isError" @click="refetch()">
        {{ error?.message + ", Tap to retry" }}
      </div>
      <div class="flex w-full flex-col" v-show="data">
        <p class="self-center text-2xl font-bold">Edit Job</p>
        <JobForm
          @submit-form="
            (jobForm: JobItem) => mutate(JSON.parse(JSON.stringify(jobForm)))
          "
          :pending="isPending"
          :error-message="error?.message"
          :job="data"
        />
      </div>
    </div>
  </div>
</template>
