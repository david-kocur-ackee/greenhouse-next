import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { Interval } from "luxon";

export default function useMutateSchedule() {
    const mutation = useMutation({
        mutationFn: (data: { intervals: Interval[] }) => {
            return axios.post(`${API_URL}/schedule`, data);
        },
    });

    return mutation;
}