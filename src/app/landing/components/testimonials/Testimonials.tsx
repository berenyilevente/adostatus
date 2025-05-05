"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components";

import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Laura M.",
    designation: "Business Owner",
    company: "Veterinary & Grooming",
    testimonial:
      "We run both a veterinary clinic and a grooming salon — finally having one tool to manage bookings for both has been a game-changer.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Vanessa L.",
    designation: "Hair Salon Owner",
    company: "Beauty Services",
    testimonial:
      "I loved how I could match the booking form to my salon's brand colors and even add my logo. Clients actually complimented the design!",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Dr. Amir R.",
    designation: "Dental Practice Admin",
    company: "Healthcare",
    testimonial:
      "We used to juggle Google Forms and calendars — TimeGrid just makes everything smoother. My staff can log in and see their appointments with zero confusion.",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Marco D.",
    designation: "Restaurant Manager",
    company: "Food & Hospitality",
    testimonial:
      "Setting up my custom form took 15 minutes. The restaurant's now fully booked every weekend. Best part? No more playing phone tag.",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    name: "Jenn K.",
    designation: "Wellness Center Owner",
    company: "Health & Wellness",
    testimonial:
      "We tested a few scheduling tools, but most didn't let us tweak the booking form. TimeGrid gave us control without needing to code.",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: 6,
    name: "Ryan P.",
    designation: "Clinic Coordinator",
    company: "Healthcare Services",
    testimonial:
      "As someone who's not super tech-savvy, I really appreciated how visual and intuitive the dashboard is. It just works.",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
  },
];

export const Testimonials = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  return (
    <div className="w-full flex justify-center items-center my-12 px-6">
      <div className="w-full">
        <h2 className="mb-4 text-5xl md:text-6xl font-bold text-center tracking-tight">
          Testimonials
        </h2>
        <div className="text-center text-muted-foreground text-lg mb-14">
          Loved by multi-location owners and solo founders alike
        </div>
        <div className="container w-full lg:max-w-screen-lg xl:max-w-screen-xl mx-auto px-12">
          <Carousel setApi={setCarouselApi}>
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => carouselApi?.scrollTo(index)}
                className={cn("h-3.5 w-3.5 rounded-full border-2", {
                  "bg-primary border-primary": current === index + 1,
                })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) => (
  <div className="mb-8 bg-accent rounded-xl py-8 px-6 sm:py-12 sm:px-24">
    <div className="flex items-center justify-between gap-20">
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-between gap-1">
          <div className="hidden sm:flex md:hidden items-center gap-4">
            <Avatar className="w-8 h-8 md:w-10 md:h-10">
              <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
                {testimonial.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.designation}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
            <StarIcon className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
            <StarIcon className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
            <StarIcon className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
            <StarIcon className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
          </div>
        </div>
        <p className="mt-6 text-lg sm:text-2xl lg:text-[1.75rem] xl:text-2xl leading-normal lg:!leading-normal font-semibold tracking-tight">
          &quot;{testimonial.testimonial}&quot;
        </p>
        <div className="flex sm:hidden md:flex mt-6 items-center gap-4">
          <Avatar>
            <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.designation}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
