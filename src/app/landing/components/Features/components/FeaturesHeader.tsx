import { ReactElement } from "react";

import { Icon } from "@/components";

export const FeaturesHeader = (): ReactElement => {
  return (
    <div className="text-center">
      <div className="inline-block rounded border border-indigo-500/5 bg-indigo-500/5 p-2.5">
        <Icon icon="wand2" fontSize={20} className="text-primary" />
      </div>
      <p className="mt-2 text-3xl font-semibold">
        {/* 💡 COPY TIP: Remind visitors about the value of your product. Why do they need it? */}
        Supercharge your dev time, build apps faster!
      </p>
      {/* 💡 COPY TIP: Explain how your product delivers what you promise in the headline. */}
      <p className="mt-3 inline-block max-w-md text-base-content/80">
        Accelerate your development with ready-to-use components. Spend your
        time building great apps, not reinventing the wheel.
      </p>
    </div>
  );
};
