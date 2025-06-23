'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export interface OnboardingStep {
  title: string;
  description: string;
  children: React.ReactNode;
  onPrevious?: () => void;
  onNext?: () => void;
  actionTitle?: string;
}

export interface StepProps extends OnboardingStep {
  isActive: boolean;
  isCompleted: boolean;
  currentStep: number;
}

export function Step({
  title,
  description,
  children,
  isActive,
  isCompleted,
  currentStep,
  onPrevious,
  onNext,
}: StepProps) {
  return (
    <div className={`mb-4 ${!isActive && 'hidden'}`}>
      <div className="pt-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{title}</h3>
              {isCompleted && (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
            </div>
            {isActive && (
              <>
                <p className="mt-2 text-muted-foreground">{description}</p>
                <div className="mt-4">{children}</div>
                <div className="mt-8 w-full flex justify-between">
                  {currentStep > 0 ? (
                    <Button variant="secondary" onClick={onPrevious}>
                      Previous
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  <Button onClick={onNext}>Next</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
