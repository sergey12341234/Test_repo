import { useFormContext } from 'react-hook-form';
import ControlledRadioGroup from '@/components/forms/ControlledRadioGroup/ControlledRadioGroup';
import type { FC } from 'react';
import type { FormData } from '@/schema/schema';

type Props = {
  onNext: () => void;
  skipToLastStep: () => void;
};

export const StepAlbum: FC<Props> = ({
  onNext,
  skipToLastStep,
}) => {
  const {
    control,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<FormData>();

  const handleNext = async () => {
    const valid = await trigger('readyToCreate');
    if (!valid) return;

    const answer = getValues('readyToCreate');

    if (answer === 'no') {
      skipToLastStep(); 
    } else {
      onNext();
    }
  };

  return (
    <ControlledRadioGroup<FormData, 'readyToCreate'>
      name="readyToCreate"
      control={control}
      onClick={handleNext}
      label="Ready to create your first photo album?"
      options={[
        { label: 'Yes, let’s begin', value: 'yes' },
        { label: 'No, not interested yet', value: 'no' },
      ]}
      error={errors.readyToCreate}
    />
  );
};
