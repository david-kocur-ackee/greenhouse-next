import { useQuery } from "@tanstack/react-query";
import type Measurement from "~domain/Measurement";
import { fetchCurrentTemperature } from "~modules/api/functions/queryFunctions";

export default function useGetCurrentTemperature() {
    const { data, isPending, error } = useQuery({
        queryKey: ['current-temperature'],
        queryFn: fetchCurrentTemperature,
        staleTime: 1000 * 30, 
    });

    return { data: data as Measurement[], isPending, error };
}