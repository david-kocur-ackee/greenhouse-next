import { useQuery } from "@tanstack/react-query";
import type Measurement from "~domain/Measurement";
import { fetchCo2Measurements } from "~modules/api/functions/queryFunctions";

export default function useGetCo2Measurements() {
    const { data, isPending, error } = useQuery({
        queryKey: ['co2-measurements'],
        queryFn: fetchCo2Measurements,
        staleTime: 1000 * 30, 
    });

    return { data: data as Measurement[], isPending, error };
}