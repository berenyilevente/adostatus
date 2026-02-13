import { ReactElement } from 'react';

import { Icon } from '@/components';
import { config } from '@/config';

export const FeaturesHeader = (): ReactElement => {
  return (
    <div className="text-center">
      <div className="inline-block rounded border border-indigo-500/5 bg-indigo-500/5 p-2.5">
        <Icon icon="calendar" fontSize={20} className="text-primary" />
      </div>
      <p className="mt-2 text-3xl font-semibold">
        Everything You Need in One Platform
      </p>
      <p className="mt-3 inline-block max-w-md text-base-content/80">
        No more juggling multiple scheduling tools for different businesses.
        {config.app.name} handles it all with a flexible platform designed for
        multi-business owners.
      </p>
    </div>
  );
};
