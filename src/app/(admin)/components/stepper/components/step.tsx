'use client';

import { CheckCircle2 } from 'lucide-react';

export interface OnboardingStep {
  title: string;
  description: string;
  children: React.ReactNode;
  actionTitle?: string;
}

export interface StepProps extends OnboardingStep {
  isActive: boolean;
  isCompleted: boolean;
}

export function Step({
  title,
  description,
  children,
  isActive,
  isCompleted,
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
