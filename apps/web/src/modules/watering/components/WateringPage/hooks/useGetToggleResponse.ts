import { useQuery } from "@tanstack/react-query";
import { fetchToggle } from "~modules/api/functions/queryFunctions";

export default function useGetToggleResponse() {
    const { data, isPending, error } = useQuery({
        queryKey: ['toggle-response'],
        queryFn: fetchToggle,
        staleTime: 1000 * 30, 
    });

    return { data: data as { state: boolean }, isPending, error };
}