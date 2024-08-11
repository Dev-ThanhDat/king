import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { apiGetPin, apiUpdatePin } from '~/api/config';
import ButtonField from '~/components/ButtonField';
import ImageUploadField from '~/components/ImageUploadField';
import InputField from '~/components/InputField';
import TextareaField from '~/components/TextareaField';
import useImagePreview from '~/hooks/useImagePreview';

const FILE_SIZE = 20000000;

const schema = yup.object({
  title: yup.string().required('Please! Enter your title.'),
  category: yup.string().required('Please! Enter your category.'),
  thumbnail: yup.mixed().test('fileSize', 'The file is too large', (value) => {
    return !value || value.size <= FILE_SIZE;
  })
});

const EditPin = () => {
  const location = useLocation();
  const { pinId } = useParams();
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
    const response = await apiUpdatePin(pinId, formData);
    if (response && response.success === true) {
      toast.success('Updated pin successfully!');
      reset({
        title: '',
        category: '',
        description: '',
        thumbnail: null
      });
      setImagePreview(null);
      navigate(-1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const fetchPin = async (pinId) => {
    const response = await apiGetPin(pinId);
    if (response && response.success === true) {
      setValue('title', response.pin.title);
      setValue('category', response.pin.category);
      setValue('description', response.pin.description);
      if (response.pin.thumbnail?.url) {
        const imageFile = await fetch(response.pin.thumbnail.url).then((res) =>
          res.blob()
        );
        imageFile.preview = response.pin.thumbnail.url;
        setImagePreview(imageFile);
      }
    }
  };

  useEffect(() => {
    fetchPin(pinId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinId]);

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
        <h2 className='text-[28px] font-bold mb-5'>Edit pin</h2>

        <form
          autoComplete='off'
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col w-full gap-[15px]'
        >
          <InputField
            name='title'
            placeholder='Add a title...'
            error={errors.title?.message}
            control={control}
          />
          <InputField
            name='category'
            placeholder='Add a category...'
            error={errors.category?.message}
            control={control}
          />
          <TextareaField
            name='description'
            placeholder='Add a description...'
            control={control}
          />
          <ButtonField
            isSubmitting={isSubmitting}
            name='Edit'
          />
        </form>
      </div>
    </section>
  );
};

export default EditPin;
