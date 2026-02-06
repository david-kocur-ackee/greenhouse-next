import { useQuery } from "@tanstack/react-query";
import type Measurement from "~domain/Measurement";

export default function useGetCurrentHumidity() {
    const { data, isPending, error } = useQuery({
        queryKey: ['current-humidity'],
        queryFn: () => fetch('/api/measurements/humidity?current=true').then(res => res.json()),
    });

    return { data: data as Measurement[], isPending, error };
}