'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Onboarding } from '@/app/(admin)/components/';
import { CreateBusiness } from '../../business/create/CreateBusiness';
import { useCreateBusiness } from '../../business/create/use-create-business';
import { useOnboardUser } from './use-onboard-user';
import {
  Card,
  CardContent,
  FileInput,
  FormColorPicker,
  FormInput,
  FormSelect,
  FormTagInput,
  FormTextarea,
  FormTimepicker,
  FormWrapper,
  Label,
  Logo,
} from '@/components';
import { OnboardingStep } from '../../components/onboarding/components/step';
import { businessTypes } from './onboard-user.helper';
import { config } from '@/config';

export const OnboardUser = () => {
  const { currentStep, setCurrentStep, form } = useOnboardUser();

  console.log(form.watch('services'));

  const steps: OnboardingStep[] = [
    {
      title: 'Welcome to TimeGrid!',
      description:
        "Tell us about your business and let's make it shine online.",
      children: (
        <div className="space-y-6 mt-8">
          <FormInput
            control={form.control}
            label="Business Name"
            name="name"
            placeholder="Enter your business name"
          />
          <FormSelect
            control={form.control}
            label="Business Type"
            name="businessType"
            placeholder="Select your business type"
            options={businessTypes}
          />
          {form.watch('businessType') === 'other' && (
            <FormInput
              control={form.control}
              name="customBusinessType"
              placeholder="Enter your business type"
            />
          )}
          <FormTagInput
            control={form.control}
            name="services"
            label="Services"
            placeholder="Add services and press Enter"
            maxTags={8}
            tagSeparator=","
          />
          <div>
            <Label>Set your business hours</Label>
            <div className="flex gap-4 w-full">
              <FormTimepicker
                control={form.control}
                name="businessHours"
                placeholder="09:00"
                className="w-full"
              />
              <FormTimepicker
                control={form.control}
                name="businessHours"
                placeholder="17:00"
                className="w-full"
              />
            </div>
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
          <div className="filepond-file-upload">
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
      ),
    },
  ];

  const onPrevious = (step: number) => {
    if (step === 0) {
      return;
    }

    setCurrentStep(step - 1);
  };

  const onNext = (step: number) => {
    setCurrentStep(step + 1);
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardContent className="p-6">
        <FormWrapper form={form}>
          <Logo text={config.app.name} />
          <Onboarding
            steps={steps}
            currentStep={currentStep}
            onPrevious={onPrevious}
            onNext={onNext}
          />
        </FormWrapper>
      </CardContent>
    </Card>
  );
};
