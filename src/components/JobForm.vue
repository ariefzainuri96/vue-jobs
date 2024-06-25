<script setup lang="ts">
import { SelectItem } from "@/data/model/select-item";
import CustomSelect from "./CustomSelect.vue";
import { onMounted, ref } from "vue";
import Button from "./ui/button/Button.vue";
import CustomInput from "./CustomInput.vue";
import { ValidationMessage } from "@/data/model/validation-message";
import { JobItem } from "@/data/responses/jobs-response";

const props = defineProps<{
  pending: boolean;
  errorMessage?: ValidationMessage[];
  job?: JobItem;
}>();

const jobForm = ref<JobItem | null>();

const handleChange = (e: Event) => {
  const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
  jobForm.value = { ...jobForm.value, [name]: value };
};

const handleCompanyChange = (e: Event) => {
  const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
  jobForm.value = {
    ...jobForm.value,
    company: { ...jobForm.value?.company, [name]: value },
  };
};

const jobType: SelectItem[] = [
  { value: "Full-Time", content: "Full-Time" },
  { value: "Contract", content: "Contract" },
  { value: "Freelance", content: "Freelance" },
  { value: "Part-Time", content: "Part-Time" },
];

const salary: SelectItem[] = [
  { value: "under $50K", content: "under $50K" },
  { value: "$60K - $70K", content: "$60K - $70K" },
  { value: "$70K - $80K", content: "$70K - $80K" },
  { value: "$90K - $100K", content: "$90K - $100K" },
];

onMounted(() => {
  if (props.job) {
    jobForm.value = props.job;
  }
});
</script>

<template>
  <form @submit.prevent="$emit('submit-form', jobForm)" class="w-full">
    <CustomSelect
      label="Job Type"
      :items="jobType"
      placeholder="Select Job Type"
      :value="jobForm?.type"
      :handle-change="(value) => (jobForm = { ...jobForm, type: value })"
      :error-message="
        (errorMessage ?? []).find((e) => (e.name ?? []).includes('type'))
          ?.message
      "
    />
    <CustomInput
      variant="input"
      label="Job Listing Name"
      name="title"
      placeholder="eg. Vue Developer Expert"
      :value="jobForm?.title"
      @input="handleChange"
      :error-message="
        (errorMessage ?? []).find((e) => (e.name ?? []).includes('title'))
          ?.message
      "
    />
    <CustomInput
      variant="area"
      label="Description"
      name="description"
      placeholder="Add a description of your job listing"
      :value="jobForm?.description"
      @input="handleChange"
      :error-message="
        (errorMessage ?? []).find((e) => (e.name ?? []).includes('description'))
          ?.message
      "
    />
    <CustomSelect
      label="Salary"
      :items="salary"
      placeholder="Select Salary"
      :value="jobForm?.salary"
      :handle-change="(value) => (jobForm = { ...jobForm, salary: value })"
      :error-message="
        (errorMessage ?? []).find((e) => (e.name ?? []).includes('salary'))
          ?.message
      "
    />
    <CustomInput
      variant="input"
      label="Location"
      name="location"
      placeholder="Add a location of your job listing"
      :value="jobForm?.location"
      @input="handleChange"
      :error-message="
        (errorMessage ?? []).find((e) => (e.name ?? []).includes('location'))
          ?.message
      "
    />
    <p class="mt-2 text-xl font-semibold">Company Info</p>
    <CustomInput
      variant="input"
      label="Company Name"
      name="name"
      placeholder="Add a company name of your job listing"
      :value="jobForm?.company?.name"
      @input="handleCompanyChange"
      :error-message="
        (errorMessage ?? []).find(
          (e) =>
            (e.name ?? []).includes('company') &&
            (e.name ?? []).includes('name'),
        )?.message
      "
    />
    <CustomInput
      variant="area"
      label="Company Description"
      name="description"
      placeholder="Add a company description of your job listing"
      :value="jobForm?.company?.description"
      @input="handleCompanyChange"
      :error-message="
        (errorMessage ?? []).find(
          (e) =>
            (e.name ?? []).includes('company') &&
            (e.name ?? []).includes('description'),
        )?.message
      "
    />
    <CustomInput
      variant="input"
      type="email"
      label="Company Email"
      name="contactEmail"
      placeholder="Add a company email of your job listing"
      :value="jobForm?.company?.contactEmail"
      @input="handleCompanyChange"
      :error-message="
        (errorMessage ?? []).find((e) =>
          (e.name ?? []).includes('contactEmail'),
        )?.message
      "
    />
    <CustomInput
      variant="input"
      type="number"
      label="Company Phone"
      name="contactPhone"
      placeholder="Add a company phone of your job listing"
      :value="jobForm?.company?.contactPhone"
      @input="handleCompanyChange"
      :error-message="
        (errorMessage ?? []).find((e) =>
          (e.name ?? []).includes('contactPhone'),
        )?.message
      "
    />
    <Button
      type="submit"
      :disabled="pending"
      :aria-disabled="pending"
      class="mt-4 w-full bg-indigo-600 text-white hover:bg-indigo-700"
      >{{ pending ? "Submitting..." : "Submit" }}</Button
    >
  </form>
</template>
