import mobileHeroLandingImg from "@/assets/images/landing/hero.png";

import Image from "next/image";
import Link from "next/link";

import { config } from "@/config";
import { Leads } from "../Leads/Leads";

export const Footer = () => {
  return (
    <div>
      <div className="container py-16">
        <div className="relative grid items-center overflow-hidden rounded-xl bg-primary/5 lg:grid-cols-3">
          <div className="col-span-2 p-4 text-center md:p-8">
            <div className="text-xl font-medium md:text-3xl">
              Get started with {config.app.name}
            </div>
            <Leads />
          </div>
          <div className="hidden lg:inline">
            <Image
              src={mobileHeroLandingImg}
              alt="mobile-landing"
              className="inline dark:hidden py-4 w-64"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
