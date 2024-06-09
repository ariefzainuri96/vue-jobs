<script setup lang="ts">
import { axiosInstance } from "@/data/axios";
import { JobItem } from "@/data/model/job-item";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { useRoute, useRouter } from "vue-router";
import MarkerIcon from "vue-material-design-icons/MapMarker.vue";
import { showSimpleToast, sleep } from "@/utils/utils";
import Button from "@/components/ui/button/Button.vue";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();

const showDeleteAlert = ref(false);

const { data, error, isLoading, refetch } = useQuery({
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

const { isPending: isDeletingJob, mutate: deleteJob } = useMutation({
  mutationKey: ["/jobs"],
  mutationFn: async (job: JobItem) => {
    // close alert dialog
    showDeleteAlert.value = false;

    await sleep(1000);
    const data = (await axiosInstance.delete<JobItem>(`/jobs/${job?.id}`)).data;
    return data;
  },
  onSuccess: (data) => {
    showSimpleToast({
      title: "Success!",
      description: `Berhasil menghapus job ${data?.title}`,
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
</script>

<template>
  <div class="h-full w-full overflow-y-auto bg-blue-50">
    <div v-show="isLoading">Loading...</div>
    <div v-show="error" @click="refetch()" v-if="error">
      {{ error?.message + ", Tap to retry" }}
    </div>
    <div
      v-show="data"
      class="flex flex-col gap-2 overflow-y-auto p-4 sm:grid sm:grid-cols-3"
    >
      <!-- left column -->
      <div class="flex flex-col gap-2 sm:col-span-2">
        <div class="w-full rounded-md bg-white p-4">
          <p class="text-sm text-slate-400">{{ data?.type }}</p>
          <p class="mt-2 text-2xl font-bold">{{ data?.title }}</p>
          <p class="mt-4 flex flex-row items-center text-[12px] text-red-600">
            <marker-icon :size="20" />{{ " " + data?.location }}
          </p>
        </div>
        <div class="flex w-full flex-col gap-2 rounded-md bg-white p-4">
          <p class="text-sm font-bold text-indigo-700">Job Description</p>
          <p class="text-sm">{{ data?.description }}</p>
          <p class="text-sm font-bold text-indigo-700">Salary</p>
          <p class="text-sm">{{ data?.salary }}</p>
        </div>
      </div>
      <!-- right column -->
      <div class="flex flex-col gap-2 sm:col-span-1">
        <div class="flex w-full flex-col rounded-md bg-white p-4">
          <p class="text-[16px] font-semibold">Company Info</p>
          <p class="mt-3 text-xl font-bold">{{ data?.company?.name }}</p>
          <p class="mt-2 text-sm">{{ data?.company?.description }}</p>
          <div class="mt-2 h-[1px] w-full bg-slate-200" />
          <p class="mt-2 text-[16px] font-semibold">Contact Email:</p>
          <input
            class="mt-2 rounded-md bg-slate-100 px-2 py-1"
            :value="data?.company?.contactEmail"
            readonly
          />
          <p class="mt-2 text-[16px] font-semibold">Contact Phone:</p>
          <input
            class="mt-2 rounded-md bg-slate-100 px-2 py-1"
            :value="data?.company?.contactPhone"
            readonly
          />
        </div>
        <div class="flex w-full flex-col gap-3 rounded-md bg-white p-4">
          <p class="text-lg font-bold">Manage Job</p>
          <Button
            @click="router.push(`/edit-job/${data?.id}`)"
            class="rounded-full bg-indigo-700 text-white hover:bg-indigo-800"
            >Edit Job</Button
          >
          <Button
            :disabled="isDeletingJob"
            :aria-disabled="isDeletingJob"
            @click="showDeleteAlert = true"
            class="rounded-full bg-red-600 text-white hover:bg-red-700"
            >{{ isDeletingJob ? "Deleting..." : "Delete Job" }}</Button
          >
        </div>
      </div>
      <!-- alert dialog -->
      <AlertDialog :open="showDeleteAlert" @close="showDeleteAlert = false">
        <AlertDialogContent class="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the job
              and all related data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel @click="showDeleteAlert = false"
              >Cancel</AlertDialogCancel
            >
            <AlertDialogAction @click="deleteJob(data!)"
              >Delete</AlertDialogAction
            >
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
</template>

<style></style>
