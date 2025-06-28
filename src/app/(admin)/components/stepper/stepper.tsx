'use client';

import { Step, OnboardingStep } from './components/step';

export interface StepperProps {
  steps: OnboardingStep[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
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
