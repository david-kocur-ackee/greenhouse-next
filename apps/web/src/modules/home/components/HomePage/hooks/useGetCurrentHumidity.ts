import { useQuery } from "@tanstack/react-query";
import type Measurement from "~domain/Measurement";
import { fetchCurrentHumidity } from "~modules/api/functions/queryFunctions";

export default function useGetCurrentHumidity() {
    const { data, isPending, error } = useQuery({
        queryKey: ['current-humidity'],
        queryFn: fetchCurrentHumidity,
        staleTime: 1000 * 30, 
    });

    return { data: data as Measurement[], isPending, error };
}