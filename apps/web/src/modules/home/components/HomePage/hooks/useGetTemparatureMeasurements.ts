import { useQuery } from "@tanstack/react-query";
import type Measurement from "~domain/Measurement";
import { fetchTemperatureMeasurements } from "~modules/api/functions/queryFunctions";

export default function useGetTemparatureMeasurements() {
    const { data, isPending, error } = useQuery({
        queryKey: ['temperature-measurements'],
        queryFn: fetchTemperatureMeasurements,
        staleTime: 1000 * 30, 
    });

    return { data: data as Measurement[], isPending, error };
}