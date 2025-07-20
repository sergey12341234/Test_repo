// @/hooks/useMultistepForm.ts
import { useState, type ReactElement } from 'react';

export function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    setCurrentStepIndex((prev) => prev + 1);
  };

  const skipToLastStep = () => {
    setCurrentStepIndex(steps.length - 1);
  };

  const back = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  return {
    step: steps[currentStepIndex],
    currentStepIndex,
    total: steps.length,
    isFirst: currentStepIndex === 0,
    isLast: currentStepIndex === steps.length - 1,
    next,
    back,
    skipToLastStep,
  };
}
