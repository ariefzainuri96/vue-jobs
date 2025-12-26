import { UserData } from "@/pages/LoginPage.vue";
import axios from "axios";

export const axiosInstance = (useVuePrefix: boolean = true) => {
  const user = localStorage.getItem("user");
  let token: string | null = null;

  if (user) {
    const userData: UserData = JSON.parse(user);
    token = userData.token;
    console.log("token", token);
  }

  return axios.create({
    baseURL: `https://zain-api.xyz/${useVuePrefix ? "vue" : ""}`,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : null,
    },
  });
};
