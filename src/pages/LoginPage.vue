<script setup lang="ts">
import CustomInput from "@/components/CustomInput.vue";
import { Button } from "@/components/ui/button";
import Toaster from "@/components/ui/toast/Toaster.vue";
import { axiosInstance } from "@/data/axios";
import { LoginResponse } from "@/data/responses/login-response";
import { useMutation } from "@tanstack/vue-query";
import { AxiosError } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

export type LoginForm = {
  email?: string;
  password?: string;
};

export type UserData = {
  email: string;
  token: string;
};

const router = useRouter();

const loginForm = ref<LoginForm>();
const errorMessage = ref<string>();

const { mutate: login, isPending: isPendingLogin } = useMutation({
  mutationFn: async () => {
    const response = await axiosInstance(false).post<LoginResponse>(
      "/users/login",
      JSON.stringify(loginForm.value),
    );

    return response.data;
  },
  onSuccess: (data) => {
    console.log(`Success: ${data}`);

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: loginForm?.value?.email,
        token: data.data,
      }),
    );

    router.replace("/");
  },
  onError: (error) => {
    errorMessage.value = "Something went wrong";

    if (error instanceof AxiosError) {
      errorMessage.value = error.response?.data.message;
    }
  },
});

const handleChange = (e: Event) => {
  const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
  loginForm.value = { ...loginForm.value, [name]: value };
};

const handleSubmit = () => login();
</script>

<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-center bg-blue-50"
  >
    <div class="flex min-w-[350px] flex-col rounded-lg bg-white px-10 py-4">
      <form @submit.prevent="handleSubmit">
        <CustomInput
          variant="input"
          label="Email"
          name="email"
          type="email"
          :value="loginForm?.email"
          placeholder="eg. test@mail.com"
          @input="handleChange"
        />
        <CustomInput
          variant="input"
          label="Password"
          name="password"
          type="password"
          :value="loginForm?.password"
          placeholder="******"
          @input="handleChange"
          :error-message="errorMessage"
        />
        <Button
          type="submit"
          :disabled="isPendingLogin"
          :aria-disabled="isPendingLogin"
          class="mt-4 w-full bg-indigo-600 text-white hover:bg-indigo-700"
          >{{ isPendingLogin ? "Login..." : "Login" }}</Button
        >
      </form>
      <p class="mt-4 self-center">
        Don't have an account?
        <router-link class="text-blue-500 underline" to="/register"
          >Register</router-link
        >
      </p>
    </div>
    <Toaster />
  </div>
</template>
