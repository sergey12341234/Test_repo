import { useFormContext } from 'react-hook-form';
import ControlledRadioGroup from '@/components/forms/ControlledRadioGroup/ControlledRadioGroup';
import useUserLocation from '@/hooks/useUserLocation';
import { ClipLoader } from 'react-spinners';
import type { FC } from 'react';
import type { FormData } from '@/schema/schema';

type Props = {
  onNext: () => void;
};

export const StepCountry: FC<Props> = ({ onNext }) => {
  const { location, error, loading, setLocation, setError } = useUserLocation();

  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext<FormData>();

  const handleSetLocation = () => {
    setError(null);
    setLocation('Ukraine');
  };

  const handleNext = async () => {
    const valid = await trigger('fromUserCountry');
    if (valid) onNext();
  };

  return (
    <div>
      {loading ? <ClipLoader size={50} /> : null}
      {(error && !loading) ? (
        <div 
        className='flex flex-col items-center justify-center h-full'>
          <p className="text-red-500 mb-5">Error: {error}</p>
          <button
            onClick={handleSetLocation}
            className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            set location
          </button>
        </div>
      ) : null }
      {(location && !loading && !error) ? (
        <ControlledRadioGroup<FormData, 'fromUserCountry'>
          name="fromUserCountry"
          control={control}
          onClick={handleNext}
          label={`Are you from ${location}?`}
          options={[
            { label: `Yes, I'm from ${location}`, value: 'yes' },
            { label: `No, I'm not from ${location}`, value: 'no' },
          ]}
          error={errors.fromUserCountry}
        />
      ) : null }
    </div>
  );
};
