<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import JobForm from "@/components/JobForm.vue";
import { axiosInstance } from "@/data/axios";
import { JobItem } from "@/data/model/job-item";
import { ValidationMessage } from "@/data/model/validation-message";
import { jobSchema } from "@/data/schemas/job-schema";
import { sleep } from "@/utils/utils";
import { showSimpleToast } from "@/utils/utils";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const errorMessage = ref<ValidationMessage[]>();
const {
  isPending,
  error,
  mutate: updateJob,
} = useMutation({
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

const submitForm = (jobForm: JobItem) => {
  errorMessage.value = [];

  const validation = jobSchema.safeParse(jobForm);

  if (!validation.success) {
    const { errors: err } = validation.error;

    errorMessage.value = err.map((element) => {
      return {
        message: element.message,
        name: element.path,
      };
    });

    return;
  }

  updateJob(JSON.parse(JSON.stringify(jobForm)));
};
</script>

<template>
  <div class="flex h-full flex-col items-center overflow-y-auto bg-blue-50 p-4">
    <BackButton class="self-start" />
    <div
      class="mt-4 flex w-full flex-col items-start rounded-md bg-white p-4 md:max-w-[500px]"
    >
      <div v-show="isLoading">Loading...</div>
      <div v-show="isError" @click="refetch()">
        {{ error?.message + ", Tap to retry" }}
      </div>
      <div class="flex w-full flex-col" v-show="data">
        <p class="self-center text-2xl font-bold">Edit Job</p>
        <JobForm
          @submit-form="
            (jobForm: JobItem) =>
              submitForm(JSON.parse(JSON.stringify(jobForm)))
          "
          :pending="isPending"
          :error-message="errorMessage"
          :job="data"
        />
      </div>
    </div>
  </div>
</template>
