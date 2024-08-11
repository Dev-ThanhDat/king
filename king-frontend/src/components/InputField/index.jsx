import { useController } from 'react-hook-form';

const InputField = ({
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

  return (
    <div className='flex flex-col gap-[5px] items-start'>
      <label
        className='font-semibold capitalize cursor-pointer'
        htmlFor={name}
      >
        {name}:
      </label>
      <input
        id={name}
        placeholder={placeholder}
        type={type}
        {...field}
        className='px-[10px] py-[10px] border border-color-black  w-full rounded-lg outline-none'
      />
      <p className='text-[10px] text-red-500 mt-[2px]'>{error}</p>
    </div>
  );
};

export default InputField;
