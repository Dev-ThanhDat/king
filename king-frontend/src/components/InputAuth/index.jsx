import { useState } from 'react';
import { useController } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const InputAuth = ({
  hasIcon = false,
  name = '',
  type = 'text',
  placeholder,
  error,
  control
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: ''
  });

  const [togglePassword, setTogglePassword] = useState(false);

  return (
    <div>
      <div
        className={`flex items-center p-[10px] border rounded-sm text-xs bg-color-bg-e7 gap-x-[5px]`}
      >
        <input
          id={name}
          type={hasIcon ? (togglePassword ? type : 'password') : type}
          placeholder={placeholder}
          {...field}
          className='w-full bg-transparent outline-none'
        />
        {hasIcon && (
          <span className='cursor-pointer text-[15px] border-l-[1px] border-color-border text-color-icon pl-[5px]'>
            {!togglePassword ? (
              <FaRegEyeSlash onClick={() => setTogglePassword(true)} />
            ) : (
              <FaRegEye onClick={() => setTogglePassword(false)} />
            )}
          </span>
        )}
      </div>
      <p className='text-[10px] text-red-500 mt-[2px]'>{error}</p>
    </div>
  );
};

export default InputAuth;
