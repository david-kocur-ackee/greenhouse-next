import { useState } from 'react';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { FaCarrot } from 'react-icons/fa';

import { routes } from '~constants/routes';
import { LoginFormSchema, type LoginFormSchemaType } from '~modules/form/hooks/LoginFormSchema';

import useLogin from './hooks/useLogin';

export default function Login() {
    const router = useRouter();

    const [formData, setFormData] = useState({ email: '', password: '' });

    const { mutate: login } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormSchemaType>({
        resolver: zodResolver(LoginFormSchema),
    });

    // const handleSubmit = async (event: React.FormEvent) => {
    //     event.preventDefault();
    //     try {
    //         login(formData);
    //         router.push(routes.home);
    //     } catch (error) {
    //         alert('Login failed: ' + error);
    //     }
    // };

    const onSubmit: SubmitHandler<LoginFormSchemaType> = data => {
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

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6' method='POST'>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium leading-6'>
                            Email address
                        </label>
                        <div className='mt-2'>
                            <input
                                id='email'
                                {...register('email')}
                                autoComplete='email'
                                className='block pl-3 w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neon sm:text-sm sm:leading-6'
                            />

                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-between'>
                            <label htmlFor='password' className='block text-sm font-medium leading-6'>
                                Password
                            </label>
                        </div>
                        <div className='mt-2'>
                            <input
                                id='password'
                                {...register('password')}
                                autoComplete='current-password'
                                className='block pl-3 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neon sm:text-sm sm:leading-6'
                            />
                            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='p-2 w-full h-full rounded-lg bg-dark text-white hover:bg-dark-light duration-100 grid items-center'
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
