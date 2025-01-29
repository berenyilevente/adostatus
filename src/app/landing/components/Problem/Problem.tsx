const Step = ({ emoji, text }: { emoji: string; text: string }) => {
  return (
    <div className="w-full md:w-60 flex flex-col gap-2 items-center justify-center">
      <span className="text-4xl">{emoji}</span>
      <h3 className="font-bold">{text}</h3>
    </div>
  );
};

const ProblemMobile = () => {
  return (
    <div className="mx-auto w-full sm:w-min flex flex-col sm:flex-row items-center sm:gap-16 gap-8">
      <Step
        emoji="🧑‍💻"
        text="Configuring basic features like auth, payments, etc."
      />
      <Step emoji="😮‍💨" text="Reinventing the wheel for every project" />
      <Step emoji="😔" text="Struggling to maintain consistency" />
    </div>
  );
};

// todo: rephrase and move to documentation
// Problem Agitation: A crucial, yet overlooked, component for a landing page that sells.
// It goes under your Hero section, and above your Features section.
// Your Hero section makes a promise to the customer: "Our product will help you achieve XYZ".
// Your Problem section explains what happens to the customer if its problem isn't solved.
// The copy should NEVER mention your product. Instead, it should dig the emotional outcome of not fixing a problem.
// For instance:
// - Hero: "ShipFast helps developers launch startups fast"
// - Problem Agitation: "Developers spend too much time adding features, get overwhelmed, and quit." (not about ShipFast at all)
// - Features: "ShipFast has user auth, Stripe, emails all set up for you"
export const Problem = () => {
  return (
    <section className="bg-base-200">
      <div className="max-w-7xl mx-auto px-8 py-16 md:py-32 text-center">
        <h2 className="max-w-4xl mx-auto font-extrabold text-4xl md:text-5xl tracking-tight mb-6 md:mb-8">
          Building Software Shouldn&apos;t Take Forever!
        </h2>
        <div className="py-4">
          <ProblemMobile />
        </div>
        <p className="max-w-xl mx-auto text-lg text-center opacity-90 leading-relaxed mt-12">
          What if you could skip the tedious parts and jump straight to the fun
          part: <strong>building your app</strong>?
        </p>
      </div>
    </section>
  );
};
