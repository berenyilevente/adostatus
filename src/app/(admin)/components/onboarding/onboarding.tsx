'use client';

import { Button, Progress } from '@/components';
import { Step, OnboardingStep } from './components/step';
import { useRouter } from 'next/navigation';

export interface OnboardingProps {
  steps: OnboardingStep[];
  currentStep: number;
}

export function Onboarding({ steps, currentStep }: OnboardingProps) {
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="mx-auto">
      {/* <Progress value={progress} /> */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <Step
            key={index}
            {...step}
            isActive={currentStep === index}
            isCompleted={currentStep > index}
          />
        ))}
      </div>
    </div>
  );
}
