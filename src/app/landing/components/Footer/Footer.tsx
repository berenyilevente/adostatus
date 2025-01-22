import mobileHeroLandingImg from "@/assets/images/landing/hero.png";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components";
import { config } from "@/config";

export const Footer = () => {
  return (
    <div>
      <div className="container py-16">
        <div className="relative grid items-center overflow-hidden rounded-xl bg-primary/5 lg:grid-cols-3">
          <div className="col-span-2 p-4 text-center md:p-8">
            <p className="text-xl font-medium md:text-3xl">
              Get started with {config.app.name} today
            </p>
            <div className="mt-6 inline-flex items-center gap-3">
              <Link href={"#pricing"}>
                <Button color={"primary"} startIcon="shoppingCart">
                  Purchase Now
                </Button>
              </Link>
              <Link href={"#"}>
                <Button variant={"ghost"}>View Demo</Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:inline">
            <Image
              src={mobileHeroLandingImg}
              alt="mobile-landing"
              className="inline dark:hidden py-4"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
