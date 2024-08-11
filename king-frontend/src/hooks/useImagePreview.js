import { useState, useEffect } from 'react';

const useImagePreview = (name, setValue) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setValue(name, file);
    file.preview = URL.createObjectURL(file);
    setImagePreview(file);
  };

  useEffect(() => {
    return () => {
      imagePreview && URL.revokeObjectURL(imagePreview.preview);
    };
  }, [imagePreview]);

  return { imagePreview, imageFile, setImagePreview, handleImageChange };
};

export default useImagePreview;
