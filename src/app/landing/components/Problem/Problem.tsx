import { Card, CardBody, Icon } from "@/components";

const Step = ({ emoji, text }: { emoji: string; text: string }) => {
  return (
    <div className="w-full md:w-48 flex flex-col gap-2 items-center justify-center">
      <span className="text-4xl">{emoji}</span>
      <h3 className="font-bold">{text}</h3>
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
        <h2 className="max-w-3xl mx-auto font-extrabold text-4xl md:text-5xl tracking-tight mb-6 md:mb-8">
          The solution to complex code
        </h2>
        <p className="max-w-xl mx-auto text-lg opacity-90 leading-relaxed mb-12 md:mb-20">
          Developing reusable components is hard. It takes time and effort.
          Without it, you end up with a complex code that&apos;s hard to
          maintain.
        </p>

        <div className="flex flex-col items-center gap-16 relative w-min mx-auto">
          <Step emoji="🧑‍💻" text="Pick up a project" />
          <Icon
            icon="moveRight"
            className="rotate-45 absolute top-24 right-28"
          />
          <div className="flex items-center">
            <div className="flex flex-col justify-center">
              <Icon
                icon="moveUp"
                className="rotate-45 absolute top-24 left-28"
              />
              <Step emoji="😔" text="Quit project" />
            </div>
            <Icon icon="moveRight" className="rotate-180" />
            <Step emoji="😮‍💨" text="Loose the oversight" />
          </div>
        </div>
      </div>
    </section>
  );
};
