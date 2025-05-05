import { Button } from "@/components";
import Link from "next/link";

const features = [
  {
    category: "Customization",
    title: "Create booking experiences that feel like part of your brand",
    details:
      "We sweat the small stuff — form layout, branding options, mobile experience — so you don’t have to. With TimeGrid, your booking page doesn’t feel like a third-party tool. It feels like your business.",
    tutorialLink: "#",
  },
  {
    category: "Optimized Experience",
    title: "Seamless on every device, embedded on any site",
    details:
      "Whether your customers book from mobile, tablet, or desktop, TimeGrid forms load fast and look sharp. Add your form to any website in seconds.",
    tutorialLink: "#",
  },
  {
    category: "Built for multi-business owners",
    title: "One tool, multiple booking flows",
    details:
      "Whether you run a hair salon and a vet clinic — or five restaurants — TimeGrid keeps your operations separate but simple.",
    tutorialLink: "#",
  },
  {
    category: "Smart Features That Do the Work for You",
    title: "Book faster. Look better. Stay in control.",
    details:
      "Pre-filled fields for returning clients, automatic error detection in forms, smart scheduling to avoid overlaps, email notifications for you and your customers",
    tutorialLink: "#",
  },
];

export const Features = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-lg w-full py-10 px-6">
        <h2 className="text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight max-w-xl md:text-center md:mx-auto">
          ...introducing <span className="text-primary">TimeGrid</span>
        </h2>
        <div className="text-muted-foreground text-lg max-w-md md:text-end md:mx-auto">
          *scheduling, simplified
        </div>
        <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {features.map((feature) => (
            <div
              key={feature.category}
              className="flex flex-col md:flex-row items-center gap-x-20 gap-y-6 md:odd:flex-row-reverse"
            >
              <div className="w-full aspect-[6/4] bg-muted rounded-xl border border-border/50 basis-1/2" />
              <div className="basis-1/2 shrink-0">
                <span className="uppercase font-semibold text-sm text-muted-foreground">
                  {feature.category}
                </span>
                <h4 className="my-3 text-3xl font-semibold tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground text-[17px]">
                  {feature.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
