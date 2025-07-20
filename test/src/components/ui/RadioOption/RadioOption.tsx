// @/components/forms/ControlledInput/RadioOption.tsx

import React from 'react';

interface RadioOptionProps {
  value: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({ value, label, checked, onChange, onClick }) => {
  return (
    <label className="flex items-center gap-2 width-full border-[#495F6E] border-1 rounded-lg p-5 hover:text-white hover:bg-[#0D99FF] hover:border-[#0D99FF] cursor-pointer">
      <input type="radio" value={value} checked={checked} onChange={onChange} onClick={onClick} />
      {label}
    </label>
  );
};

export default RadioOption;
