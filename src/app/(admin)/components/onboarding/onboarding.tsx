'use client';

import { Button, Progress } from '@/components';
import { Step, OnboardingStep } from './components/step';
import { useRouter } from 'next/navigation';

export interface OnboardingProps {
  steps: OnboardingStep[];
  currentStep: number;
  onPrevious: (step: number) => void;
  onNext: (step: number) => void;
}

export function Onboarding({
  steps,
  currentStep,
  onPrevious,
  onNext,
}: OnboardingProps) {
  const progress = (currentStep / steps.length) * 100;
  const router = useRouter();

  const onComplete = () => {
    router.push('/dashboard');
  };

  return (
    <div className="mx-auto">
      {/* <Progress value={progress} /> */}
      <div className="space-y-4">
        {currentStep >= steps.length ? (
          <div className="text-start space-y-4 py-8">
            <h2 className="text-2xl font-bold text-green-600">
              You're all set!
            </h2>
            <p className="text-muted-foreground mt-2">
              You've completed the onboarding process. Click the button below to
              start using TimeGrid.
            </p>
            <div className="flex justify-between">
              <Button
                variant="secondary"
                onClick={() => onPrevious(currentStep)}
              >
                Previous
              </Button>
              <Button onClick={onComplete}>Get Started</Button>
            </div>
          </div>
        ) : (
          steps.map((step, index) => (
            <Step
              key={index}
              {...step}
              isActive={currentStep === index}
              isCompleted={currentStep > index}
              onPrevious={() => onPrevious(index)}
              onNext={() => onNext(index)}
              currentStep={currentStep}
            />
          ))
        )}
      </div>
    </div>
  );
}
