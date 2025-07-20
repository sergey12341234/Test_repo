// @/components/forms/ControlledInput/ControlledRadioGroup.tsx
import { Controller } from 'react-hook-form';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import RadioOption from '../../ui/RadioOption/RadioOption';

interface Option {
  label: string;
  value: string;
}

interface Props<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> {
  name: TName;
  control: Control<TFieldValues>;
  options: Option[];
  label?: string;
  error?: FieldError;
  onClick: () => void;
}

const ControlledRadioGroup = <TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  name,
  control,
  options,
  label,
  onClick,
  error,
}: Props<TFieldValues, TName>) => {
  return (
    <div className="mb-4">
      {label && <p className="form-text mb-8">{label}</p>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            {options.map(opt => (
              <RadioOption
                key={opt.value}
                label={opt.label}
                value={opt.value}
                checked={field.value === opt.value}
                onChange={field.onChange}
                onClick={onClick}
              />
            ))}
          </div>
        )}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default ControlledRadioGroup;
