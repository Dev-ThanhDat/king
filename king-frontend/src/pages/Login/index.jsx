import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { apiLogin } from '~/api/config';
import { doSaveUserIdAction } from '~/app/account/slice';
import ButtonField from '~/components/ButtonField';
import InputAuth from '~/components/InputAuth';

const schema = yup.object({
  email: yup
    .string()
    .email('Please! Enter your email.')
    .required('Please! Enter your email.'),
  password: yup.string().required('Please! Enter your password.')
});

const Login = () => {
  const location = useLocation();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const response = await apiLogin(email, password);
    if (response && response.success === true) {
      localStorage.setItem('access_token', response.accessToken);
      dispatch(doSaveUserIdAction(response.userData._id));
      toast.success(response.message);
      reset({
        email: '',
        password: ''
      });
      navigate('/');
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
            src='/login-bg.jpg'
            alt='Login image'
            className='object-cover w-full h-full'
          />
        </div>

        <div className='flex-1'>
          <h2 className='pb-[10px] mb-5 text-xl font-bold text-center uppercase border-b border-color-border md:text-3xl'>
            Login
          </h2>

          <form
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col w-full gap-y-[10px]'
          >
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
              name='Login'
            />
          </form>

          <p className='pt-5 mt-5 text-center border-t border-color-border'>
            You have not had an account?{' '}
            <Link
              to={'/register'}
              className='font-bold underline transition-all hover:text-color-red text-color-black'
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
