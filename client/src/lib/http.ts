import config from "@/config";
import { sleep } from "@/utils";
import axios from "axios";
import { toast } from "sonner";

export const http = axios.create({
  baseURL: config.BACKEND + "/api",
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const fetcher = (url: string) => http.get(url).then((res) => res.data);

export const httpError = async (error: any) => {
  if (error.response.status === 401) {
    toast.error("Tekrar giriş yapmanız için yönlendiriliyorsunuz...");
    localStorage.removeItem("token");
    await sleep(2000);
    location.replace("/login");
  }

  let errorMessage = "Something went wrong!";
  let errorDescription = "Please try again later.";

  if (error.response) {
    const { message, errors } = error.response.data;

    message && (errorMessage = message);
    errors && (errorDescription = JSON.stringify(errors));
  } else if (error.request) {
    errorMessage = error.request;
  } else {
    errorMessage = error.message;
  }

  toast.error(errorMessage, {
    description: errorDescription,
  });
};
