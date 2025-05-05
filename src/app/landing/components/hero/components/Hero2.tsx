"use client";

import { Button } from "@/components";
import { config } from "@/config";
import Link from "next/link";

export const Hero2 = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-12 sm:py-32">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing {config.app.name}.{" "}
              <a href="#features" className="font-semibold text-primary">
                <span aria-hidden="true" className="absolute inset-0" />
                Learn more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Appointment Scheduling That Adapts to Your Business
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Create fully customizable booking forms that match your brand and
              work across industries — all from one intuitive platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="#footer">
                <Button variant="default">Get Started</Button>
              </Link>
              <Link
                href="#features"
                className="text-sm/6 font-semibold text-gray-900"
              >
                See how it works <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
