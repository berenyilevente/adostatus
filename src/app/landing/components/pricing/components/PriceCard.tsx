'use client';

import { ReactElement, useState } from 'react';

import {
  Card,
  CardTitle,
  CardContent,
  Icon,
  CardFooter,
  CardHeader,
  CardDescription,
  Button,
} from '@/components';
import { stripe } from '@/config/stripe.config';
import { createCheckoutSession } from '@/app/actions/stripe/checkout.action';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface PriceProps {
  title: string;
  price: number;
  priceAnchor: number;
}

export const Price = ({ title, price, priceAnchor }: PriceProps): ReactElement => {
  return (
    <div className="mt-2 flex items-center justify-between ">
      <p className="text-xl font-medium">{title}</p>
      <div className="flex items-center gap-2">
        <div>
          <p className="text-2xl font-semibold">
            {price}
            {stripe.currency}
          </p>
        </div>
        <div className="flex flex-col justify-end text-lg">
          <p className="relative">
            <span className="absolute bg-black h-[1.5px] inset-x-0 top-[50%]"></span>
            <span className="text-black/80">
              {stripe.currency}
              {priceAnchor}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

interface PriceCardProps {
  priceId: string;
  name: string;
  description: string;
  price: number;
  priceAnchor: number;
  included: {
    name: string;
  }[];
  excluded: {
    name: string;
  }[];
  isFeatured: boolean;
}

export const PriceCard = ({
  priceId,
  name,
  description,
  price,
  priceAnchor,
  included,
  excluded,
  isFeatured,
}: PriceCardProps): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);
    router.push(`/auth/purchase?priceId=${priceId}`);
  };

  return (
    <Card className={cn('w-full sm:w-96', isFeatured && 'border border-primary')}>
      <CardContent>
        <CardHeader>
          <CardTitle>
            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full">
                <Price title={name} price={price} priceAnchor={priceAnchor} />
              </div>
            </div>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <div className="flex flex-col gap-2">
          <CardContent className="grid gap-2 h-80">
            <p className="mt-4 text-sm text-base-content/70">Includes:</p>
            {included.map((item, index) => (
              <div key={`included-${item}-${index}`} className="grid grid-cols-9 items-center">
                <Icon icon="check" fontSize={16} className="text-green-500" />
                <p className="col-span-8">{item.name}</p>
              </div>
            ))}
            <div className="flex flex-col gap-2">
              {excluded.map((item, index) => (
                <div key={`excluded-${item}-${index}`} className="grid grid-cols-9 items-center">
                  <Icon icon="xCircle" fontSize={16} className="text-gray-500" />
                  <p className="col-span-8">{item.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Button
              variant={isFeatured ? 'default' : 'outline'}
              fullWidth
              onClick={handleCheckout}
              isLoading={isLoading}
            >
              Get Started
            </Button>
            <div className="text-xs text-base-content/70 mt-2 w-full text-start">
              Billed anually - Prices excl. VAT.
            </div>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  );
};
