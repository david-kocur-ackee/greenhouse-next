import { useEffect, useState } from 'react';
import { DateTime, Duration } from 'luxon';
import { BsWater } from 'react-icons/bs';
import { WiThermometer } from 'react-icons/wi';
import Measurement from 'src/domain/Measurement';
import Preset from 'src/domain/Preset';

import { useGet } from '~hooks/useGet';
import CurrentValBox from '~modules/home/components/CurrentValBox/CurrentValBox';
import LineChart from '~modules/home/components/LineChart/LineChart';
import PresetStatus from '~modules/home/components/PresetStatus/PresetStatus';
import WateringStatus from '~modules/home/components/WateringStatus/WateringStatus';
import { displayNetworkError } from '~utils/errorToast';

const API_URL = '/api';

export default function HomePage() {
    const co2ChartResponse = useGet<Measurement[]>(`${API_URL}/measurements/co2`);

    const humidityChartResponse = useGet<Measurement[]>(`${API_URL}/measurements/humidity`);

    const temperatureChartResponse = useGet<Measurement[]>(`${API_URL}/measurements/temperature`);

    const getToggleResponse = useGet<{ state: boolean }>(`${API_URL}/watering-system/toggle`);

    if (getToggleResponse.error != null) {
        displayNetworkError(getToggleResponse.error.message);
    }
    if (co2ChartResponse.error != null) {
        displayNetworkError(co2ChartResponse.error.message);
    }
    if (humidityChartResponse.error != null) {
        displayNetworkError(humidityChartResponse.error.message);
    }
    if (temperatureChartResponse.error != null) {
        displayNetworkError(temperatureChartResponse.error.message);
    }
    const presetResponse = useGet<Preset>(`${API_URL}/current-preset`);

    const co2Thresholds = presetResponse.data?.thresholds?.find(({ type }) => type === 'co2');

    const humidityThresholds = presetResponse.data?.thresholds.find(({ type }) => type === 'humidity');

    const temperatureThresholds = presetResponse.data?.thresholds.find(({ type }) => type === 'temperature');

    const [temperature, setTemperature] = useState<number | null>(null);
    const [humidity, setHumidity] = useState<number | null>(null);
    const [co2, setCo2] = useState<number | null>(null);
    const [date, setDate] = useState<number | null>(null);

    const co2Response = useGet<Measurement[]>(`${API_URL}/measurements/co2?current=true`);

    const humidityResponse = useGet<Measurement[]>(`${API_URL}/measurements/humidity?current=true`);

    const temperatureResponse = useGet<Measurement[]>(`${API_URL}/measurements/temperature?current=true`);

    if (co2Response.error != null) {
        displayNetworkError(co2Response.error.message);
    }
    if (humidityResponse.error != null) {
        displayNetworkError(humidityResponse.error.message);
    }
    if (temperatureResponse.error != null) {
        displayNetworkError(temperatureResponse.error.message);
    }

    const [timeToWatering, setTimeToWatering] = useState<Duration | null>(null);

    useEffect(() => {
        const target = DateTime.now().plus({ hours: 2, minutes: 34, seconds: 20 });

        setTimeToWatering(target.diff(DateTime.now()));

        const interval = setInterval(() => {
            setTimeToWatering(target.diff(DateTime.now()));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let mounted = true;

        if (mounted && temperatureResponse.data != null) {
            setTemperature(temperatureResponse.data[0].value);
        }
        if (mounted && co2Response.data != null) {
            setCo2(co2Response.data[0].value);
            setDate(co2Response.data[0].timestamp);
        }
        if (mounted && humidityResponse.data != null) {
            setHumidity(humidityResponse.data[0].value);
        }

        return () => {
            mounted = false;
        };
    }, [co2Response, humidityResponse, temperatureResponse]);

    return (
        <div className='grid m-3 grid-cols-1 lg:grid-cols-5 gap-5'>
            <div className='lg:col-span-2 flex flex-col gap-5'>
                {' '}
                <CurrentValBox
                    temperature={temperature?.toString() ?? ''}
                    datetime={new Date(date ?? '').toLocaleString()}
                    humidity={humidity?.toString() ?? ''}
                    co2={co2?.toString() ?? ''}
                />
                <WateringStatus
                    isOnline={getToggleResponse.data?.state ?? false}
                    timeToWatering={timeToWatering ?? Duration.fromObject({ hours: 0, minutes: 0, seconds: 0 })}
                />
                <PresetStatus preset={presetResponse.data} />
            </div>

            <div className='lg:col-span-3 flex flex-col gap-5'>
                <LineChart
                    measurements={co2ChartResponse.data}
                    type='co2'
                    bgColor='#ffefde'
                    accentColor='#FFDCB6'
                    icon={
                        <div className='font-semibold'>
                            CO<sub>2</sub>
                        </div>
                    }
                    maxThreshold={co2Thresholds?.max}
                    minThreshold={co2Thresholds?.min}
                />

                <LineChart
                    measurements={temperatureChartResponse.data}
                    type='temperature'
                    bgColor='#feffde'
                    accentColor='#f4f5bd'
                    icon={<WiThermometer className='w-full h-full' />}
                    maxThreshold={temperatureThresholds?.max}
                    minThreshold={temperatureThresholds?.min}
                />

                <LineChart
                    measurements={humidityChartResponse.data}
                    type='humidity'
                    bgColor='#e6f5fb'
                    accentColor='#b0d7e7'
                    icon={<BsWater className='w-full h-full' />}
                    maxThreshold={humidityThresholds?.max}
                    minThreshold={humidityThresholds?.min}
                />
            </div>
        </div>
    );
}
