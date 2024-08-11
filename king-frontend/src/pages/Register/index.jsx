import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { apiRegister } from '~/api/config';
import ButtonField from '~/components/ButtonField';
import InputAuth from '~/components/InputAuth';

const schema = yup.object({
  username: yup
    .string()
    .required('Please! Enter your username.')
    .max(30, 'Please! Maximum 30 characters'),
  email: yup
    .string()
    .email('Please! Enter your email.')
    .required('Please! Enter your email.'),
  password: yup
    .string()
    .required('Please! Enter your password.')
    .min(8, 'Your password must be at least 8 characters or greater!')
    .matches(
      /[A-Z]/,
      'Your password must contain at least one uppercase letter!'
    )
    .matches(
      /[a-z]/,
      'Your password must contain at least one lowercase letter!'
    )
    .matches(/\d/, 'Your password must contain at least one number!')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Your password must contain at least one special character!'
    )
});

const Register = () => {
  const location = useLocation();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    const response = await apiRegister(username, email, password);
    if (response && response.success) {
      toast.success(response.message);
      reset({
        username: '',
        email: '',
        password: ''
      });
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <section className='flex items-center justify-center w-full min-h-[calc(100vh-60px)]'>
      <div className='p-5 bg-white rounded-lg shadow-lg md:max-w-[70%] w-full flex items-center gap-x-5'>
        <div className='w-2/4 overflow-hidden shrink-0 h-[550px] rounded-lg hidden lg:block'>
          <img
            src='/register.jpg'
            alt='Register image'
            className='object-cover w-full h-full'
          />
        </div>

        <div className='flex-1'>
          <h2 className='pb-[10px] mb-5 text-xl font-bold text-center uppercase border-b border-color-border md:text-3xl'>
            Register
          </h2>

          <form
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col w-full gap-y-[10px]'
          >
            <InputAuth
              name='username'
              placeholder='Please! Enter your username.'
              error={errors.username?.message}
              control={control}
            />
            <InputAuth
              name='email'
              placeholder='Please! Enter your email.'
              error={errors.email?.message}
              control={control}
            />
            <InputAuth
              hasIcon
              name='password'
              placeholder='Please! Enter your password.'
              error={errors.password?.message}
              control={control}
            />
            <ButtonField
              isSubmitting={isSubmitting}
              name='Register'
            />
          </form>

          <p className='pt-5 mt-5 text-center border-t border-color-border'>
            Do you already have an account?{' '}
            <Link
              to={'/login'}
              className='font-bold underline transition-all hover:text-color-red text-color-black'
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
