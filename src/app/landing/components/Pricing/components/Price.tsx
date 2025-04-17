import { ReactElement } from "react";

export const Price = ({
  title,
  price,
  priceAnchor,
  currency = "$",
}: {
  title: string;
  price: number;
  priceAnchor: number;
  currency?: string;
}): ReactElement => {
  return (
    <div className="mt-2 flex items-center justify-between ">
      <p className="text-xl font-medium">{title}</p>
      <div className="flex items-center gap-2">
        <div>
          <p className="text-2xl font-semibold">
            {price}
            {currency}
          </p>
        </div>
        <div className="flex flex-col justify-end text-lg">
          <p className="relative">
            <span className="absolute bg-black h-[1.5px] inset-x-0 top-[50%]"></span>
            <span className="text-black/80">
              {currency}
              {priceAnchor}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
