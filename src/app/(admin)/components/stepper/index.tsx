'use client';

import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface OnboardingStep {
  title: string;
  description: string;
  children: ReactNode;
}

interface OnboardingProps {
  title: string;
  description: string;
  steps: OnboardingStep[];
  currentStep: number;
  onStepComplete: (step: number) => void;
}

export const Onboarding = ({
  title,
  description,
  steps,
  currentStep,
  onStepComplete,
}: OnboardingProps) => {
  return (
    <div className="container max-w-5xl py-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="flex gap-4">
          <div className="hidden lg:flex flex-col gap-2 w-64">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  currentStep === index
                    ? 'bg-primary text-primary-foreground'
                    : index < currentStep
                      ? 'bg-muted'
                      : 'bg-background'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium ${
                      currentStep === index
                        ? 'bg-primary-foreground text-primary'
                        : index < currentStep
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="font-medium">{step.title}</span>
                </div>
              </div>
            ))}
          </div>

          <Card className="flex-1 p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">{steps[currentStep].title}</h2>
                <p className="text-muted-foreground">{steps[currentStep].description}</p>
              </div>
              {steps[currentStep].children}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
