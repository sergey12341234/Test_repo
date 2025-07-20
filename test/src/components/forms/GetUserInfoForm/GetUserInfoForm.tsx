import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StepCountry } from '@/components/forms/steps/StepCountry';
import { useMemo } from 'react';
import { useMultistepForm } from '@/hooks/useMultistepForm';
import { StepAlbum } from '@/components/forms/steps/StepAlbum';
import StepNextTime from '../steps/StepNextTime';
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar';
import { schema, type FormData } from '@/schema/schema';
import { UploadImageStep } from '../steps/UploadImageStep';
import PreviewImageStep from '../steps/PreviewImageStep';

export const GetUserInfoForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fromUserCountry: null,
      readyToCreate: null,
      image: null,
    },
  });

  const { handleSubmit } = form;

  const stepList = useMemo(() => {
    return [
      <StepCountry onNext={() => next()} key="country" />,
      <StepAlbum onNext={() => next()} skipToLastStep={() => skipToLastStep()} key="album" />,
      <UploadImageStep onNext={() => next()} key="upload" />,
      <PreviewImageStep key="preview" />,
      <StepNextTime key="next-time" />,
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { step, currentStepIndex, total, next, skipToLastStep } = useMultistepForm(stepList);

  const onSubmit = handleSubmit(data => {
    console.log('Final form data:', data);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="h-full flex flex-col w-[100%]">
        <div className="mb-4">
          <ProgressBar
            progress={Math.floor(
              ((currentStepIndex >= total - 1 ? total - 2 : currentStepIndex) / (total - 2)) * 100
            )}
          />
        </div>
        <div className="display flex grow-1 items-center justify-center">{step}</div>
      </form>
    </FormProvider>
  );
};
