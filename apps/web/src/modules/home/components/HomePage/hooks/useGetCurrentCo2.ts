import { useQuery } from "@tanstack/react-query";
import type Measurement from "~domain/Measurement";

export default function useGetCurrentCo2() {
    const { data, isPending, error } = useQuery({
        queryKey: ['current-co2'],
        queryFn: () => fetch('/api/measurements/co2?current=true').then(res => res.json()),
    });

    return { data: data as Measurement[], isPending, error };
}