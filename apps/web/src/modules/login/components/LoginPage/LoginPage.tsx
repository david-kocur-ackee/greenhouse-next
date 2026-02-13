import { useRouter } from 'next/router';
import type { SubmitHandler } from 'react-hook-form';
import { FaCarrot } from 'react-icons/fa';

import { routes } from '~constants/routes';
import type { LoginFormSchemaType } from '~modules/form/hooks/LoginFormSchema';

import LoginForm from '../LoginForm/LoginForm';
import useLogin from './hooks/useLogin';

export default function Login() {
    const router = useRouter();

    const { mutate: login } = useLogin();

    const onFormSubmit: SubmitHandler<LoginFormSchemaType> = data => {
        login(data);
        router.push(routes.home);
    };

    return (
        <div className='flex h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm '>
                <div className='flex justify-center'>
                    <div className='w-9 h-9'>
                        <FaCarrot className='text-4xl text-neon' />
                    </div>
                </div>
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 text-gray-900'>
                    Sign in to your account
                </h2>
            </div>
            <LoginForm onFormSubmit={onFormSubmit} />
        </div>
    );
}
