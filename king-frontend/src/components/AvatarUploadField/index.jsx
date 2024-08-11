import { FaUpload } from 'react-icons/fa';

const AvatarUploadField = ({ imagePreview, onImageChange, text, error }) => {
  return (
    <div className='flex flex-col items-center justify-center '>
      <label className='w-[250px] h-[250px] rounded-full overflow-hidden border border-color-black'>
        <input
          type='file'
          className='hidden'
          onChange={onImageChange}
        />
        {imagePreview ? (
          <img
            src={imagePreview.preview}
            alt='Preview'
            className='object-cover w-full h-full'
          />
        ) : (
          <div className='flex flex-col items-center justify-center w-full h-full gap-5 text-center'>
            <FaUpload size={25} />
            <p className='text-xs'>{text}</p>
          </div>
        )}
      </label>
      {error && (
        <p className='text-[10px] text-red-500 mt-[5px] text-center'>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default AvatarUploadField;
