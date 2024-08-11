import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { apiCreatePin } from '~/api/config';
import ButtonField from '~/components/ButtonField';
import ImageUploadField from '~/components/ImageUploadField';
import InputField from '~/components/InputField';
import TextareaField from '~/components/TextareaField';
import useImagePreview from '~/hooks/useImagePreview';

const FILE_SIZE = 20000000;

const schema = yup.object({
  title: yup.string().required('Please! Enter your title.'),
  category: yup.string().required('Please! Enter your category.'),
  thumbnail: yup
    .mixed()
    .required('Please! Upload an image.')
    .test('fileSize', 'The file is too large', (value) => {
      return value && value.size <= FILE_SIZE;
    })
});

const Create = () => {
  const location = useLocation();

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
    useImagePreview('thumbnail', setValue);

  const onSubmit = async (data) => {
    const { title, category, description } = data;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    if (imageFile) {
      formData.append('thumbnail', imageFile);
    }
    const response = await apiCreatePin(formData);
    if (response && response.success === true) {
      toast.success('Created pin successfully!');
      reset({
        title: '',
        category: '',
        description: '',
        thumbnail: null
      });
      setImagePreview(null);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <section className='flex flex-col w-full min-h-[calc(100vh-60px)] gap-12 p-5 overflow-hidden bg-white rounded-lg shadow-lg lg:flex-row'>
      <div className='lg:max-w-[375px] w-full'>
        <ImageUploadField
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          text='We recommend using high quality .jpg files less than 20MB.'
          error={errors.thumbnail}
        />
      </div>

      <div className='flex flex-col justify-center flex-1 shrink-0'>
        <h2 className='text-[28px] font-bold mb-5'>Create pin</h2>

        <form
          autoComplete='off'
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col w-full gap-[15px]'
        >
          <InputField
            name='title'
            placeholder='Add a title...'
            errors={errors.title?.message}
            control={control}
          />
          <InputField
            name='category'
            placeholder='Add a category...'
            errors={errors.category?.message}
            control={control}
          />
          <TextareaField
            name='description'
            placeholder='Add a description...'
            control={control}
          />
          <ButtonField
            isSubmitting={isSubmitting}
            name='Create'
          />
        </form>
      </div>
    </section>
  );
};

export default Create;
