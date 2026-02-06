import Link from 'next/link';
import { Duration } from 'luxon';
import { AiOutlineCalendar } from 'react-icons/ai';

import durationToString from '~utils/durationToString';

import RectIcon from '../../../UI/RectIcon';

interface WateringStatusProps {
    isOnline: boolean;
    timeToWatering: Duration;
}

export default function WateringStatus({ isOnline, timeToWatering }: WateringStatusProps) {
    const status = isOnline ? 'ON' : 'OFF';

    return (
        <Link href='/watering'>
            <div className='p-3 rounded-lg hover:bg-dark-light duration-150 cursor-pointer bg-dark'>
                <div>
                    <RectIcon bgColor='white' icon={<AiOutlineCalendar className='w-full h-full' />} />
                </div>
                <div className='mt-3 flex text-white flex-col justify-between '>
                    <div className='font-bold'>Water System: {status}</div>
                    <div className='text-xs mt-2'>
                        Next watering in:
                        <span className='font-bold whitespace-nowrap'> {durationToString(timeToWatering)}</span>{' '}
                    </div>
                </div>
            </div>
        </Link>
    );
}
