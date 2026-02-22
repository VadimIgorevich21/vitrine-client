import type { AxiosError } from "axios";

export const getError = (error: unknown): string | Record<string, any> | null => {
  // приводим unknown к AxiosError или кастомной ошибке
  const axiosError = error as AxiosError;

  // кастомная ошибка
  if ((error as any).name === "Fetch User") {
    return (error as any).message;
  }

  if (!axiosError.response) {
    console.info(`API: ${axiosError.config?.url} not found`);
    console.info(axiosError);
    return "API Request Error, please try again";
  }

  if (import.meta.env.DEV) {
    console.group("dev error info");
    console.info("[DATA]", axiosError.response.data);
    console.info(`[STATUS] ${axiosError.response.status}`);
    console.info("[HEADERS]", axiosError.response.headers);
    console.groupEnd();
  }

  if (axiosError.response.data && (axiosError.response.data as any).errors) {
    return (axiosError.response.data as any).errors;
  }

  if (
      axiosError.response.data &&
      axiosError.response.status === 403 &&
      (axiosError.response.data as any).message
  ) {
    return (axiosError.response.data as any).message;
  }

  return null;
};