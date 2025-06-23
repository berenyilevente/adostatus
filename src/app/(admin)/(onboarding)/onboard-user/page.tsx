import type { Metadata } from 'next';

import { OnboardUserProvider } from './use-onboard-user';
import { OnboardUser } from './OnboardUser';
import { CreateBusinessProvider } from '../../business/create/use-create-business';

export const metadata: Metadata = {
  title: 'Onboard User',
};

const Users = async () => {
  // TODO: get onboarding status from database
  //   let onboarding: Onboarding[] = [];
  //   const rUsers = await getOnboarding();

  return (
    <OnboardUserProvider>
      <CreateBusinessProvider>
        <OnboardUser />
      </CreateBusinessProvider>
    </OnboardUserProvider>
  );
};

export default Users;
