import { useQuery } from "@tanstack/react-query";
import type Measurement from "~domain/Measurement";
import { fetchHumidityMeasurements } from "~modules/api/functions/queryFunctions";

export default function useGetHumidityMeasurements() {
    const { data, isPending, error } = useQuery({
        queryKey: ['humidity-measurements'],
        queryFn: fetchHumidityMeasurements,
        staleTime: 1000 * 30, 
    });

    return { data: data as Measurement[], isPending, error };
}