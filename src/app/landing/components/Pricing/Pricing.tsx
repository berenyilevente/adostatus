import { config } from "@/config";
import { Button, Icon } from "@/components";

import { PriceCard } from "./components/PriceCard";

// todo: rephrase and move to documentation
// <Pricing/> displays the pricing plans for your app
// It's your Stripe config in config.js.stripe.plans[] that will be used to display the plans
// <ButtonCheckout /> renders a button that will redirect the user to Stripe checkout called the /api/stripe/create-checkout API endpoint with the correct priceId
export const Pricing = () => {
  return (
    <div className="container pt-24" id="pricing">
      <div className="text-center">
        <div className="inline-block rounded border border-green-500/5 bg-green-500/5 p-2.5">
          <Icon icon={"dollarSign"} fontSize={20} className="text-green-600" />
        </div>
        <p className="mt-1 text-3xl font-semibold">Pricing</p>
        <p className="mt-3 inline-block max-w-sm text-base-content/70">
          Be among the first 100 on the waitlist and ensure 40% off at launch!
        </p>
      </div>
      <div className="mt-8 flex sm:flex-row flex-col justify-center gap-6">
        {config.stripe.plans.map((plan) => (
          <PriceCard key={plan.priceId} {...plan} />
        ))}
      </div>
    </div>
  );
};
