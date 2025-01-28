"use client";

import Link from "next/link";

import { config } from "@/config";
import { Button, Image } from "@/components";
import hero from "@/assets/images/landing/hero.svg";

export const Hero = () => {
  return (
    <section className="mt-12 max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <h1 className="font-extrabold text-4xl lg:text-5xl tracking-tight md:-mb-4">
          Ready-to-Use Components at your fingertips
        </h1>
        <p className="text-lg opacity-80 leading-relaxed ">
          Build fast and deliver high-quality applications with SwiftBlocks - a
          deployment-ready component library based on Tailwind and Daisy UI.
        </p>
        <Link href="#footer">
          <Button variant="active" size="lg">
            Join the {config.app.name} waitlist!
          </Button>
        </Link>
      </div>
      <div className="lg:w-full">
        <Image src={hero} alt="Product Demo" priority={true} />
      </div>
    </section>
  );
};
