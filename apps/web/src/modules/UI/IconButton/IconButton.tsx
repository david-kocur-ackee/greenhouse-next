import { Button } from '@mui/base';

interface IconButtonProps {
    onClick: () => void;
    icon: React.ReactNode;
}

export default function IconButton({ onClick, icon }: IconButtonProps) {
    return (
        <Button
            onClick={() => onClick()}
            className='w-10 h-10 rounded-lg bg-dark hover:bg-dark-light duration-100 grid place-self-center'
        >
            <div className='w-full h-full text-white grid place-self-center'>{icon}</div>
        </Button>
    );
}
