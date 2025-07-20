import { useFormContext } from 'react-hook-form';
import type { FormData } from '@/schema/schema';
import { useEffect, type FC } from 'react';
import { saveDataToLocalStorage } from '@/utils/saveDataToLocalStorage';
import { saveDataToCookies } from '@/utils/saveDataToCookies';
import { Congrats } from '@/assets';

const PreviewImageStep: FC = () => {
  const { getValues } = useFormContext<FormData>();
  const image = getValues('image');

  const imageUrl = image ? URL.createObjectURL(image) : null;

  useEffect(() => {
    const saveDataToStorages = () => {
      saveDataToCookies(getValues());
      saveDataToLocalStorage(getValues());
    };

    saveDataToStorages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center w-full flex flex-col items-center gap-6">
      {imageUrl ? <img src={Congrats} alt="Uploaded preview" /> : null}
      <h2 className="form-text">
        {imageUrl ? 'Image uploaded successfully' : 'No image uploaded'}
      </h2>


      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Uploaded preview"
          className="rounded-xl max-w-[90%] max-h-[500px] object-contain"
        />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl p-12 bg-gray-50 text-gray-500 max-w-[90%]">
          <img
            src="https://www.svgrepo.com/show/508199/image.svg"
            alt="No image"
            className="w-10 h-10 mb-2 opacity-60"
          />
        </div>
      )}
    </div>
  );
};
export default PreviewImageStep;
