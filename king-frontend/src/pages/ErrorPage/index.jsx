import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className='flex gap-y-5 items-center justify-center p-[15px] w-screen h-screen flex-col'>
      <h1 className='font-bold text-[50px] md:text-7xl'>Oops!</h1>
      <p className='text-base'>Sorry, an unexpected error has occurred.</p>
      <p className='text-2xl italic md:text-4xl'>{error.statusText}</p>
      <Link
        to={'/'}
        className='bg-color-red px-[15px] py-[5px] hover:bg-opacity-80 transition-all text-white rounded-md font-semibold'
      >
        Return Home
      </Link>
    </div>
  );
};

export default ErrorPage;
