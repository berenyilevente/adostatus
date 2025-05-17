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
            <div className="text-md font-medium md:text-xl">
              {config.app.name} is a flexible appointment scheduling software
              for businesses that want booking forms that feel like part of
              their brand. One dashboard. Unlimited forms. For every business
              you run.
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link href="/landing/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};
