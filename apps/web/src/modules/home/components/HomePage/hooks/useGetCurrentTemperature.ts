import { useQuery } from "@tanstack/react-query";
import type Measurement from "~domain/Measurement";

export default function useGetCurrentTemperature() {
    const { data, isPending, error } = useQuery({
        queryKey: ['current-temperature'],
        queryFn: () => fetch('/api/measurements/temperature?current=true').then(res => res.json()),
    });

    return { data: data as Measurement[], isPending, error };
}