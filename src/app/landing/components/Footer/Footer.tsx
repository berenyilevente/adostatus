import mobileHeroLandingImg from "@/assets/images/landing/hero.png";

import Image from "next/image";
import Link from "next/link";

import { config } from "@/config";
import { Leads } from "../leads/leads";

export const Footer = () => {
  return (
    <div>
      <div className="container py-4 my-12 bg-primary/5">
        <div className="relative grid items-center overflow-hidden rounded-xl lg:grid-cols-3">
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
              className="inline dark:hidden py-4 w-3/4"
            />
          </div>
        </div>
        <div className="text-center">
          <Link href="/landing/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};
