import { toast } from "react-toastify";

export default function displayNetworkError(message: string) {
    toast.error(message);
}