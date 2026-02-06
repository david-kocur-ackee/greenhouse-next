import { useQuery } from "@tanstack/react-query";
import type Measurement from "~domain/Measurement";

export default function useGetHumidityMeasurements() {
    const { data, isPending, error } = useQuery({
        queryKey: ['humidity-measurements'],
        queryFn: () => fetch('/api/measurements/humidity').then(res => res.json()),
    });

    return { data: data as Measurement[], isPending, error };
}