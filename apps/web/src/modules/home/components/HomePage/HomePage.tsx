import { useEffect, useMemo, useState } from 'react';
import { DateTime, Duration } from 'luxon';
import { BsWater } from 'react-icons/bs';
import { WiThermometer } from 'react-icons/wi';

import CurrentValBox from '~modules/home/components/CurrentValBox/CurrentValBox';
import LineChart from '~modules/home/components/LineChart/LineChart';
import PresetStatus from '~modules/home/components/PresetStatus/PresetStatus';
import WateringStatus from '~modules/home/components/WateringStatus/WateringStatus';
import { displayNetworkError } from '~utils/errorToast';

import useGetCo2Measurements from './hooks/useGetCo2Measurements';
import useGetCurrentCo2 from './hooks/useGetCurrentCo2';
import useGetCurrentHumidity from './hooks/useGetCurrentHumidity';
import useGetCurrentTemperature from './hooks/useGetCurrentTemperature';
import useGetHumidityMeasurements from './hooks/useGetHumidityMeasurements';
import useGetPresetResponse from './hooks/useGetPresetResponse';
import useGetTemparatureMeasurements from './hooks/useGetTemparatureMeasurements';
import useGetToggleResponse from './hooks/useGetToggleResponse';

export default function HomePage({}) {
    const { data: co2Measurements, error: co2Error } = useGetCo2Measurements();
    const { data: humidityMeasurements, error: humidityError } = useGetHumidityMeasurements();
    const { data: temperatureMeasurements, error: temperatureError } = useGetTemparatureMeasurements();
    const { data: presetResponse, error: presetError } = useGetPresetResponse();
    const { data: toggleResponse, error: toggleError } = useGetToggleResponse();

    const { data: currentCo2, error: co2CurrentError } = useGetCurrentCo2();
    const { data: currentHumidity, error: humidityCurrentError } = useGetCurrentHumidity();
    const { data: currentTemperature, error: temperatureCurrentError } = useGetCurrentTemperature();

    const error = [
        co2Error,
        humidityError,
        temperatureError,
        toggleError,
        presetError,
        co2CurrentError,
        humidityCurrentError,
        temperatureCurrentError,
    ].find(Boolean);

    if (error) {
        displayNetworkError(error.message ?? 'Unknown error');
    }

    const co2Thresholds = useMemo(
        () => presetResponse?.thresholds?.find(({ type }) => type === 'co2'),
        [presetResponse],
    );

    const humidityThresholds = useMemo(
        () => presetResponse?.thresholds?.find(({ type }) => type === 'humidity'),
        [presetResponse],
    );

    const temperatureThresholds = useMemo(
        () => presetResponse?.thresholds?.find(({ type }) => type === 'temperature'),
        [presetResponse],
    );

    const [temperature, setTemperature] = useState<number | null>(null);
    const [humidity, setHumidity] = useState<number | null>(null);
    const [co2, setCo2] = useState<number | null>(null);
    const [date, setDate] = useState<number | null>(null);

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
        if (currentTemperature) {
            setTemperature(currentTemperature[0].value);
        }
        if (currentCo2) {
            setCo2(currentCo2[0].value);
            setDate(currentCo2[0].timestamp);
        }
        if (currentHumidity) {
            setHumidity(currentHumidity[0].value);
        }
    }, [currentCo2, currentHumidity, currentTemperature]);

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
                    isOnline={toggleResponse?.state ?? false}
                    timeToWatering={timeToWatering ?? Duration.fromObject({ hours: 0, minutes: 0, seconds: 0 })}
                />
                <PresetStatus preset={presetResponse} />
            </div>

            <div className='lg:col-span-3 flex flex-col gap-5'>
                <LineChart
                    measurements={co2Measurements}
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
                    measurements={temperatureMeasurements}
                    type='temperature'
                    bgColor='#feffde'
                    accentColor='#f4f5bd'
                    icon={<WiThermometer className='w-full h-full' />}
                    maxThreshold={temperatureThresholds?.max}
                    minThreshold={temperatureThresholds?.min}
                />

                <LineChart
                    measurements={humidityMeasurements}
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
