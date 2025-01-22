import { CardActions, Icon } from "@/components";

import { ReactElement } from "react";

import { Card, CardTitle, CardBody, Button } from "@/components";
import { Price } from "./Price";
import Link from "next/link";

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
  return (
    <Card
      className={`w-full sm:w-96 ${isFeatured ? "border border-primary" : ""}`}
    >
      <CardBody className="flex flex-col gap-2 justify-between">
        <div>
          <CardTitle>
            <div className="flex flex-col">
              <div className="flex flex-col w-full">
                <Price title={name} price={price} priceAnchor={priceAnchor} />
              </div>
              <p className="mt-2 text-sm font-normal text-base-content/90">
                {description}
              </p>
            </div>
          </CardTitle>
          <div className="grid gap-2">
            <p className="mt-4 text-sm text-base-content/70">Included:</p>
            {included.map((item, index) => (
              <div
                key={`included-${item}-${index}`}
                className="grid grid-cols-9 items-center"
              >
                <Icon icon="check" fontSize={16} className="text-green-500" />
                <p className="col-span-8">{item.name}</p>
              </div>
            ))}
            <div>
              <div className="my-3 block border border-dashed border-base-content/10" />
            </div>
            {excluded.map((item, index) => (
              <div
                key={`excluded-${item}-${index}`}
                className="grid grid-cols-9 items-center"
              >
                <Icon icon="xCircle" fontSize={16} className="text-gray-500" />
                <p className="col-span-8">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <CardActions>
          <Link
            className="w-full"
            href={`https://buy.stripe.com/${priceId}`}
            target={"_blank"}
          >
            <Button variant={isFeatured ? "active" : "ghost"}>Buy Now</Button>
          </Link>
          <div className="text-sm text-base-content/70 mt-2">
            Pay once, access forever!
          </div>
        </CardActions>
      </CardBody>
    </Card>
  );
};
