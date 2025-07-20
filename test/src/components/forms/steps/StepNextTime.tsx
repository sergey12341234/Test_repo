import HandSVG from '@/assets/svgs/HandSVG';
import type { FormData } from '@/schema/schema';
import { saveDataToCookies } from '@/utils/saveDataToCookies';
import { saveDataToLocalStorage } from '@/utils/saveDataToLocalStorage';
import { useEffect, type FC } from 'react';
import { useFormContext } from 'react-hook-form';

const StepNextTime: FC = () => {
  const { getValues } = useFormContext<FormData>();

  useEffect(() => {
    const saveDataToStorages = () => {
      saveDataToCookies(getValues());
      saveDataToLocalStorage(getValues());
    };

    saveDataToStorages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <div className="mb-6">
        <HandSVG />
      </div>
      <h2 className="form-text">Well then let's try next time</h2>
    </div>
  );
};

export default StepNextTime;
