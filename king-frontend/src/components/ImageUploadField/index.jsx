import { FaUpload } from 'react-icons/fa';

const ImageUploadField = ({ imagePreview, onImageChange, text, error }) => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full overflow-hidden rounded-md'>
      <label className='flex items-center justify-center w-full h-full'>
        <input
          type='file'
          className='hidden'
          onChange={onImageChange}
        />
        {imagePreview ? (
          <img
            src={imagePreview.preview}
            alt='Preview image'
            className='w-full rounded-md'
          />
        ) : (
          <div className='flex items-center justify-center h-full p-[15px] overflow-hidden rounded-md cursor-pointer bg-color-bg-e9'>
            <div className='relative flex flex-col items-center justify-center w-full h-full gap-5 p-5 text-center border-2 border-white border-dashed'>
              <FaUpload size={25} />
              <p className='text-xs'>{text}</p>
            </div>
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

export default ImageUploadField;
