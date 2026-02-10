const LoginForm = () => {
    
    return (
        <div>
            <label htmlFor='email' className='block text-sm font-medium leading-6'>
                Email address
            </label>
            <div className='mt-2'>
                <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='block pl-3 w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neon sm:text-sm sm:leading-6'
                />
            </div>
        </div>
    );
};

export default LoginForm;
