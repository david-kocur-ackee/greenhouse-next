import { useQuery } from "@tanstack/react-query";

export default function useGetToggleResponse() {
    const { data, isPending, error } = useQuery({
        queryKey: ['toggle-response'],
        queryFn: () => fetch('/api/watering-system/toggle').then(res => res.json()),
    });

    return { data: data as { state: boolean }, isPending, error };
}