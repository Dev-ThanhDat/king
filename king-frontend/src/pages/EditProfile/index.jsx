import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { apiGetUser, apiUpdateUser } from '~/api/config';
import AvatarUploadField from '~/components/AvatarUploadField';
import ButtonField from '~/components/ButtonField';
import InputField from '~/components/InputField';
import TextareaField from '~/components/TextareaField';
import useImagePreview from '~/hooks/useImagePreview';

const FILE_SIZE = 20000000;

const schema = yup.object({
  username: yup.string().required('Please! Enter your title.'),
  avatar: yup.mixed().test('fileSize', 'The file is too large', (value) => {
    return !value || value.size <= FILE_SIZE;
  })
});

const EditProfile = () => {
  const location = useLocation();
  const { profileId } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const { imagePreview, imageFile, setImagePreview, handleImageChange } =
    useImagePreview('avatar', setValue);

  const onSubmit = async (data) => {
    const { username, about } = data;
    const formData = new FormData();
    formData.append('username', username);
    if (about) {
      formData.append('about', about);
    }
    if (imageFile) {
      formData.append('avatar', imageFile);
    }
    const response = await apiUpdateUser(profileId, formData);
    if (response && response.success === true) {
      toast.success('Updated user successfully!');
      reset({
        title: '',
        about: '',
        avatar: null
      });
      setImagePreview(null);
      navigate(-1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const fetchUser = async (userId) => {
    const response = await apiGetUser(userId);
    if (response && response.success === true) {
      setValue('username', response.result.username);
      setValue('about', response.result.about);
      if (response.result.avatar?.url) {
        const imageFile = await fetch(response.result.avatar.url).then((res) =>
          res.blob()
        );
        imageFile.preview = response.result.avatar.url;
        setImagePreview(imageFile);
      }
    }
  };

  useEffect(() => {
    fetchUser(profileId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

  // const [imagePreview, setImagePreview] = useState(null);
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setValue('avatar', file);
  //   file.preview = URL.createObjectURL(file);
  //   setImagePreview(file);
  // };

  // useEffect(() => {
  //   return () => {
  //     imagePreview && URL.revokeObjectURL(imagePreview.preview);
  //   };
  // }, [imagePreview]);

  return (
    <section className='w-full min-h-[calc(100vh-60px)] flex flex-col bg-white p-[15px] rounded-lg shadow-lg'>
      <div>
        <h2 className='text-[28px] font-bold'>Edit profile</h2>
        <p className='max-w-[488px] w-full mt-[10px] text-base'>
          Keep your personal details private. Information you add here is
          visible to anyone who can view your profile.
        </p>
      </div>

      <div className='flex flex-col items-center flex-1 gap-5 mt-5 md:flex-row'>
        <div className='w-2/4'>
          <AvatarUploadField
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
            text='We recommend using high quality .jpg files less than 20MB.'
            error={errors.avatar}
          />
          {/* <div className='flex flex-col items-center justify-center '>
            <label className='w-[250px] h-[250px] rounded-full overflow-hidden border border-color-black'>
              <input
                type='file'
                className='hidden'
                onChange={handleImageChange}
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
                  <p className='text-xs'>
                    We recommend using high quality .jpg files less than 20MB.
                  </p>
                </div>
              )}
            </label>
            {errors.avatar && (
              <p className='text-[10px] text-red-500 mt-[5px] text-center'>
                {errors.avatar.message}
              </p>
            )}
          </div> */}
        </div>

        <div className='flex-1 w-full'>
          <form
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col w-full gap-[15px]'
          >
            <InputField
              name='username'
              placeholder='Add a username...'
              error={errors.username?.message}
              control={control}
            />
            <TextareaField
              name='about'
              placeholder='Add a about...'
              control={control}
            />
            <ButtonField
              isSubmitting={isSubmitting}
              name='Save'
            />
            {/* <div className='flex flex-col gap-[5px] items-start'>
              <label
                className='font-semibold capitalize cursor-pointer '
                htmlFor='username'
              >
                username:
              </label>
              <input
                id='username'
                type='text'
                {...register('username')}
                placeholder='Add a username...'
                className='px-[10px] w-full py-[10px] border border-color-black rounded-lg outline-none'
              />
              <p className='text-[10px] text-red-500 mt-[2px]'>
                {errors.username?.message}
              </p>
            </div>

            <div className='flex flex-col gap-[5px] items-start'>
              <label
                className='font-semibold capitalize cursor-pointer'
                htmlFor='about'
              >
                About:
              </label>
              <textarea
                id='about'
                placeholder='Add a about...'
                {...register('about')}
                className='px-[10px] w-full py-[10px] border resize-none h-[250px] overflow-y-auto border-color-black rounded-lg outline-none'
              ></textarea>
              <p className='text-[10px] text-red-500 mt-[2px]'>
                {errors.about?.message}
              </p>
            </div>

            <button className='bg-color-red px-[10px] py-[5px] rounded-md text-white transition-all font-semibold hover:bg-opacity-90 mt-2'>
              {isSubmitting ? (
                <div className='w-[20px] h-[20px] border-2 border-white rounded-full animate-spin border-t-transparent'></div>
              ) : (
                'Save'
              )}
            </button> */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
