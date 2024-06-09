<script setup lang="ts">
import { SelectItem } from "@/data/model/select-item";
import CustomSelect from "./CustomSelect.vue";
import { JobItem } from "@/data/model/job-item";
import { ref } from "vue";
import Button from "./ui/button/Button.vue";
import CustomInput from "./CustomInput.vue";

defineProps<{ pending: boolean; errorMessage?: string }>();

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
</script>

<template>
  <form @submit.prevent="$emit('submit-form', jobForm)" class="w-full">
    <CustomSelect
      label="Job Type"
      :items="jobType"
      placeholder="Select Job Type"
      :value="jobForm?.type"
      :handle-change="(value) => (jobForm = { ...jobForm, type: value })"
    />
    <CustomInput
      variant="input"
      label="Job Listing Name"
      name="title"
      placeholder="eg. Vue Developer Expert"
      :value="jobForm?.title"
      @input="handleChange"
    />
    <CustomInput
      variant="area"
      label="Description"
      name="description"
      placeholder="Add a description of your job listing"
      :value="jobForm?.description"
      @input="handleChange"
    />
    <CustomSelect
      label="Salary"
      :items="salary"
      placeholder="Select Salary"
      :value="jobForm?.salary"
      :handle-change="(value) => (jobForm = { ...jobForm, salary: value })"
    />
    <CustomInput
      variant="input"
      label="Location"
      name="location"
      placeholder="Add a location of your job listing"
      :value="jobForm?.location"
      @input="handleChange"
    />
    <p class="mt-2 text-xl font-semibold">Company Info</p>
    <CustomInput
      variant="input"
      label="Company Name"
      name="name"
      placeholder="Add a company name of your job listing"
      :value="jobForm?.company?.name"
      @input="handleCompanyChange"
    />
    <CustomInput
      variant="area"
      label="Company Description"
      name="description"
      placeholder="Add a company description of your job listing"
      :value="jobForm?.company?.description"
      @input="handleCompanyChange"
    />
    <CustomInput
      variant="input"
      type="email"
      label="Company Email"
      name="contactEmail"
      placeholder="Add a company email of your job listing"
      :value="jobForm?.company?.contactEmail"
      @input="handleCompanyChange"
    />
    <CustomInput
      variant="input"
      type="number"
      label="Company Phone"
      name="contactPhone"
      placeholder="Add a company phone of your job listing"
      :value="jobForm?.company?.contactPhone"
      @input="handleCompanyChange"
    />
    <p class="mt-1 text-sm text-red-400" v-show="errorMessage">
      {{ errorMessage }}
    </p>
    <Button
      type="submit"
      :disabled="pending"
      :aria-disabled="pending"
      class="mt-4 w-full bg-indigo-600 text-white hover:bg-indigo-700"
      >{{ pending ? "Submitting..." : "Submit" }}</Button
    >
  </form>
</template>
