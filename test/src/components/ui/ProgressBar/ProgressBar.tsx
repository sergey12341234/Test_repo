import type { ComponentPropsWithoutRef, FC } from 'react';

type Props = ComponentPropsWithoutRef<'div'> & {
  progress?: number;
};

const ProgressBar: FC<Props> = ({ progress = 0 }) => {
  return (
    <div className="relative p-4 max-w-sm mx-auto">
      <div className="text-center">
        <span className="text-[14px] font-semibold inline-block">{progress}%</span>
      </div>
      <div className="flex rounded-full h-2 bg-gray-200">
        <div style={{ width: `${progress}%` }} className="rounded-full bg-[#0D99FF]"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
