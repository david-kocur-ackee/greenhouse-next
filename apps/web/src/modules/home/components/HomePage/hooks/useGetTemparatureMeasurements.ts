import { useQuery } from "@tanstack/react-query";
import type Measurement from "~domain/Measurement";

export default function useGetTemparatureMeasurements() {
    const { data, isPending, error } = useQuery({
        queryKey: ['temperature-measurements'],
        queryFn: () => fetch('/api/measurements/temperature').then(res => res.json()),
    });

    return { data: data as Measurement[], isPending, error };
}