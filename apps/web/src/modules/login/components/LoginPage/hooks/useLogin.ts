import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useLogin() {
    const mutation = useMutation({
        mutationFn: (data: { email: string; password: string }) => {
            return axios.post('/api/login', data);
        },
    }); 

    return mutation;
}