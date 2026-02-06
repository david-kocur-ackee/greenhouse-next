import { useQuery } from "@tanstack/react-query";
import type Preset from "~domain/Preset";

export default function useGetPresetResponse() {
    const { data, isPending, error } = useQuery({
        queryKey: ['preset-response'],
        queryFn: () => fetch('/api/current-preset').then(res => res.json()),
    });

    return { data: data as Preset, isPending, error };
}