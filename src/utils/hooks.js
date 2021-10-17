import { toast } from "react-hot-toast";
import errorHandler from "./errorHandler";

export function useErrorHandler() {
  const handleError = (error) => {
    errorHandler(error).then((msg) => toast.error(msg));
  };
  return handleError;
}
