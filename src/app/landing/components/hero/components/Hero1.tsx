"use client";

import Link from "next/link";

import { config } from "@/config";
import { Button, Image } from "@/components";
import hero from "@/assets/images/landing/hero.svg";

export const Hero1 = () => {
  return (
    <section className="mt-12 max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 items-center justify-center text-center lg:text-left lg:items-start">
        <h1 className="font-extrabold text-4xl mt-8 sm:mt-0 lg:text-6xl tracking-tight md:-mb-4">
          Launch Your App Faster Than Ever
        </h1>
        <p className="text-lg opacity-80 leading-relaxed ">
          Pre-configured, full-stack code blocks to build, deploy, and scale -
          in record time!
        </p>
        <div className="space-y-2">
          <Link href="#footer">
            <Button variant="default" size="lg" endIcon="moveRight">
              Join the waitlist!
            </Button>
          </Link>
          <div className="text-sm text-base-content/70">
            * Be the first to access {config.app.name} at launch and secure an
            exclusive discount.
          </div>
        </div>
      </div>
      <div className="lg:w-full sm:block hidden">
        <Image src={hero} alt="Product Demo" priority={true} />
      </div>
    </section>
  );
};
