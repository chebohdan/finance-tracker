import type { AxiosError } from "axios";
import { toast } from "react-toastify";

function useErrorToastNotification() {
  const showError = (message: string) => {
    toast.error(message);
  };
  return { showError };
}

export default useErrorToastNotification;
