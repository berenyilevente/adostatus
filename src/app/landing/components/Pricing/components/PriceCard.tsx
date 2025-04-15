import { ReactElement } from "react";

import {
  Card,
  CardTitle,
  CardContent,
  Icon,
  CardFooter,
  CardHeader,
  CardDescription,
} from "@/components";
import { Price } from "./Price";

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
          <div>
            <div className="grid gap-2 h-80">
              <p className="mt-4 text-sm text-base-content/70">Includes:</p>
              {included.map((item, index) => (
                <div
                  key={`included-${item}-${index}`}
                  className="grid grid-cols-9 items-center"
                >
                  <Icon icon="check" fontSize={16} className="text-green-500" />
                  <p className="col-span-8">{item.name}</p>
                </div>
              ))}
              <div className="flex flex-col gap-2">
                {excluded.map((item, index) => (
                  <div
                    key={`excluded-${item}-${index}`}
                    className="grid grid-cols-9 items-center"
                  >
                    <Icon
                      icon="xCircle"
                      fontSize={16}
                      className="text-gray-500"
                    />
                    <p className="col-span-8">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <CardFooter className="h-full">
              {/* <Link className="w-full" href="/leads">
                <Button variant={isFeatured ? "active" : "outline"}>
                  Buy now!
                </Button>
              </Link> */}
              <div className="text-sm text-base-content/70 mt-2">
                Pay once, access forever!
              </div>
            </CardFooter>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
