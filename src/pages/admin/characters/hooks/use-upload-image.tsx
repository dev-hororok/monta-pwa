import { uploadFile } from '@/services/admin/upload.api';
import * as React from 'react';

interface UseUploadImageProps {
  initialUrl: string;
}

export const useUploadImage = ({ initialUrl }: UseUploadImageProps) => {
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState(initialUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) {
      throw new Error('이미지 파일이 없습니다.');
    }

    const formData = new FormData();
    formData.append('file', imageFile);

    const imageUrl = await uploadFile(formData);
    return imageUrl;
  };

  return { imageFile, uploadImage, previewUrl, handleFileChange };
};
