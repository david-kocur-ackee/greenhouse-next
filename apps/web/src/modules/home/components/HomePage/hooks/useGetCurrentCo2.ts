import { useQuery } from "@tanstack/react-query";
import type Measurement from "~domain/Measurement";
import { fetchCurrentCo2 } from "~modules/api/functions/queryFunctions";

export default function useGetCurrentCo2() {
    const { data, isPending, error } = useQuery({
        queryKey: ['current-co2'],
        queryFn: fetchCurrentCo2,
        staleTime: 1000 * 30, 
    });

    return { data: data as Measurement[], isPending, error };
}