<script setup lang="ts">
import CustomInput from "@/components/CustomInput.vue";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/data/axios";
import { useMutation } from "@tanstack/vue-query";
import { AxiosError } from "axios";
import { ref } from "vue";
import { LoginForm } from "./LoginPage.vue";
import { RegisterResponse } from "@/data/responses/register-response";
import { showSimpleToast } from "@/utils/utils";
import Toaster from "@/components/ui/toast/Toaster.vue";

const loginForm = ref<LoginForm>();
const errorMessage = ref<string>();

const { mutate: register, isPending: isPendingRegister } = useMutation({
  mutationFn: async () => {
    errorMessage.value = "";

    const response = await axiosInstance(false).post<RegisterResponse>(
      "/users/register",
      JSON.stringify(loginForm.value),
    );

    return response.data;
  },
  onSuccess: (data) => {
    console.log(`Success: ${data}`);

    // router.replace("/login");

    loginForm.value = {
      email: "",
      password: "",
    };

    showSimpleToast({
      title: "Success!",
      description: "You have successfully registered",
    });
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

const handleSubmit = () => register();
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
          :disabled="isPendingRegister"
          :aria-disabled="isPendingRegister"
          class="mt-4 w-full bg-indigo-600 text-white hover:bg-indigo-700"
          >{{ isPendingRegister ? "Register..." : "Register" }}</Button
        >
      </form>
      <p class="mt-4 self-center">
        Already have an account?
        <router-link class="text-blue-500 underline" :replace="true" to="/login"
          >Login</router-link
        >
      </p>
    </div>
    <Toaster />
  </div>
</template>
