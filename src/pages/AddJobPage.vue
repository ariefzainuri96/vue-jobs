<script setup lang="ts">
import JobForm from "@/components/JobForm.vue";
import { axiosInstance } from "@/data/axios";
import { ValidationMessage } from "@/data/model/validation-message";
import { JobsDetailResponse } from "@/data/responses/jobs-detail-response";
import { JobItem } from "@/data/responses/jobs-response";
import { jobSchema } from "@/data/schemas/job-schema";
import { showSimpleToast } from "@/utils/utils";
import { useMutation } from "@tanstack/vue-query";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const errorMessage = ref<ValidationMessage[]>();

const { isPending, mutate: addJob } = useMutation({
  mutationKey: ["/jobs"],
  mutationFn: async (job) => {
    const data = (await axiosInstance.post<JobsDetailResponse>("/jobs", job))
      .data;
    return data.data;
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

    // set error for last input
    errorMessage.value = [{ message: "Error!", name: ["contactPhone"] }];
  },
});

const submitForm = (jobForm: JobItem) => {
  errorMessage.value = [];

  const validation = jobSchema.safeParse(jobForm);

  if (!validation.success) {
    const { errors: err } = validation.error;

    console.log(err);

    errorMessage.value = err.map((element) => {
      return {
        message: element.message,
        name: element.path,
      };
    });

    return;
  }

  addJob(JSON.parse(JSON.stringify(jobForm)));
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
        :error-message="errorMessage"
      />
    </div>
  </div>
</template>
