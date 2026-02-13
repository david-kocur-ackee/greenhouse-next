import { useQuery } from "@tanstack/react-query";
import type IntervalDto from "~domain/IntervalDto";
import { fetchSchedule } from "~modules/api/functions/queryFunctions";

export default function useGetSchedule() {
    const { data, isPending, error } = useQuery({
        queryKey: ['schedule'],
        queryFn: fetchSchedule,
        staleTime: 1000 * 30, 
    });

    return { data: data as IntervalDto[], isPending, error };
}