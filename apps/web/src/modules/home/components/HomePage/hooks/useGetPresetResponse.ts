import { useQuery } from "@tanstack/react-query";
import type Preset from "~domain/Preset";
import { fetchPreset } from "~modules/api/functions/queryFunctions";

export default function useGetPresetResponse() {
    const { data, isPending, error } = useQuery({
        queryKey: ['preset-response'],
        queryFn: fetchPreset,
        staleTime: 1000 * 30, 
    });

    return { data: data as Preset, isPending, error };
}