import { dehydrate, QueryClient } from '@tanstack/react-query';

import {
    fetchCo2Measurements,
    fetchCurrentCo2,
    fetchCurrentHumidity,
    fetchCurrentTemperature,
    fetchHumidityMeasurements,
    fetchPreset,
    fetchTemperatureMeasurements,
    fetchToggle,
} from '~modules/api/functions/queryFunctions';
import HomePage from '~modules/home/components/HomePage/HomePage';

export const getServerSideProps = async () => {
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['current-temperature'],
            queryFn: fetchCurrentTemperature,
        }),
        queryClient.prefetchQuery({
            queryKey: ['current-co2'],
            queryFn: fetchCurrentCo2,
        }),
        queryClient.prefetchQuery({
            queryKey: ['current-humidity'],
            queryFn: fetchCurrentHumidity,
        }),
        queryClient.prefetchQuery({
            queryKey: ['co2-measurements'],
            queryFn: fetchCo2Measurements,
        }),
        queryClient.prefetchQuery({
            queryKey: ['temperature-measurements'],
            queryFn: fetchTemperatureMeasurements,
        }),
        queryClient.prefetchQuery({
            queryKey: ['humidity-measurements'],
            queryFn: fetchHumidityMeasurements,
        }),
        queryClient.prefetchQuery({
            queryKey: ['preset-response'],
            queryFn: fetchPreset,
        }),
        queryClient.prefetchQuery({
            queryKey: ['toggle-response'],
            queryFn: fetchToggle,
        }),
    ]);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default HomePage;
