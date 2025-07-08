'use client';

import { Stepper } from '@/app/(admin)/components/';
import { useOnboarding } from './use-onboarding';
import {
  Button,
  Card,
  CardContent,
  FileInput,
  FormColorPicker,
  FormInput,
  FormSelect,
  FormWrapper,
  Label,
  Logo,
} from '@/components';
import { OnboardingStep } from '../../components/stepper/components/step';
import { config } from '@/config';
import { useRouter } from 'next/navigation';

// TODO add a notification indicator to finish business creation (services, hours, etc.)
export const Onboarding = () => {
  const { currentStep, isLoading, form, onSubmit } = useOnboarding();
  const router = useRouter();

  const steps: OnboardingStep[] = [
    {
      title: 'Welcome to TimeGrid!',
      description:
        "Tell us about your business and let's make it shine online. You can always change this later.",
      children: (
        <div>
          <div className="space-y-6 mt-8">
            <FormInput
              control={form.control}
              label="Business Name"
              name="name"
              placeholder="Enter your business name"
              required
            />
            <div className="space-y-2">
              <Label>Business Logo</Label>
              <FileInput
                onupdatefiles={() => {}}
                labelIdle={`<div>Add your business logo <span style="text-decoration: underline">Browse</span></div>`}
              />
            </div>
            <FormColorPicker
              control={form.control}
              name="primaryColor"
              label="Brand Color"
            />
          </div>
          <div className="flex justify-end mt-8">
            <Button
              disabled={isLoading}
              isLoading={isLoading}
              onClick={onSubmit}
            >
              Next
            </Button>
          </div>
        </div>
      ),
      actionTitle: 'Create Business',
    },
    {
      title: 'Personalize your brand',
      description: 'Add your logo and colors to make your business stand out.',
      children: (
        <div className="space-y-6">
          Sucess. Next steps: create a booking form, add your services, invite
          your team, add your business hours
          <Button onClick={() => router.push('/dashboard')}>
            Go to dashboard
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card className="max-w-xl mx-auto">
      <CardContent className="p-6">
        <FormWrapper form={form}>
          <Logo text={config.app.name} />
          <Stepper steps={steps} currentStep={currentStep} />
        </FormWrapper>
      </CardContent>
    </Card>
  );
};
