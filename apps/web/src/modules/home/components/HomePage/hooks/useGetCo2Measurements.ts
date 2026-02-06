import { useQuery } from "@tanstack/react-query";
import type Measurement from "~domain/Measurement";

export default function useGetCo2Measurements() {
    const { data, isPending, error } = useQuery({
        queryKey: ['co2-measurements'],
        queryFn: () => fetch('/api/measurements/co2').then(res => res.json()),
    });

    return { data: data as Measurement[], isPending, error };
}