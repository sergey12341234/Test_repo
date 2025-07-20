import UploadSVG from '@/assets/svgs/UploadSVG';
import type { FormData } from '@/schema/schema';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import clx from '@/utils/clx';
import delay from '@/utils/delay';
import { ClipLoader } from 'react-spinners';

export const UploadImageStep = ({ onNext }: { onNext: () => void }) => {
  const { setValue, trigger } = useFormContext<FormData>();
  const [isUploading, setIsUploading] = useState(false);

  const [dropError, setDropError] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setIsUploading(true);
    await delay(1000);

    setDropError(null);
    setValue('image', file);
    const isValid = await trigger('image');
    if (isValid) {
      setIsUploading(false);
      onNext();
      return;
    }
    setIsUploading(false);
  };

  const onDropRejected = (fileRejections: FileRejection[]) => {
    const reason = fileRejections[0]?.errors[0];
    if (!reason) return;

    switch (reason.code) {
      case 'file-too-large':
        setDropError('File is too large. Maximum size is 10MB.');
        break;
      case 'file-invalid-type':
        setDropError('Unsupported file type. Only PNG and JPG are allowed.');
        break;
      default:
        setDropError('Failed to upload file. Please try again.');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,

    multiple: false,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  useEffect(() => {
    setDropError(null);
  }, [isDragActive]);

  return (
    <div className="text-center w-full">
      <p className="text-3xl font-[900] leading-10 mb-8">Upload an Image</p>

      <div
        {...getRootProps()}
        className={clx(
          'border-dashed border-2 rounded-xl py-12 px-4 cursor-pointer transition min-w-full',
          {
            'border-green-500': isDragActive,
            'border-gray-400': !isDragActive,
            'bg-green-50': isDragActive,
            'border-red-500': dropError,
            'bg-red-50': dropError,
            'border-[#0D99FF]': isUploading,
            'bg-blue-50': isUploading,
          }
        )}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center gap-2 w-[300px] sm:w-[528px] mx-auto">
          {isUploading ? <ClipLoader size={20} color="#0D99FF" /> : <UploadSVG />}
          <p className="text-base">
            {isDragActive ? 'Drop the image here...' : 'Upload an image or drag and drop here'}
          </p>
          {dropError && <p className="text-red-500 text-sm mt-2">{dropError}</p>}
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">PNG or JPG, 10mb max</p>
    </div>
  );
};
