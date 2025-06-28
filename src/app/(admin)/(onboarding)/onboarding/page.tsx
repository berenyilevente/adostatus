import type { Metadata } from 'next';

import { OnboardingProvider } from './use-onboarding';
import { Onboarding } from './Onboarding';

export const metadata: Metadata = {
  title: 'Onboarding',
};

const OnboardingPage = async () => {
  // TODO: get onboarding status from database
  //   let onboarding: Onboarding[] = [];
  //   const rUsers = await getOnboarding();

  return (
    <OnboardingProvider>
      <Onboarding />
    </OnboardingProvider>
  );
};

export default OnboardingPage;
