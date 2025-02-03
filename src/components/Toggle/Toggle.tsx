import { forwardRef, InputHTMLAttributes, ReactElement } from "react";

import { ComponentColor, ComponentSize } from "@/types/component.types";

import { getClassNames } from "./toggle.helper";

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: ComponentSize;
  color?: ComponentColor;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ size, color, className, ...props }: ToggleProps): ReactElement => {
    const classNames = getClassNames(props);

    return <input {...props} type="checkbox" className={classNames} />;
  }
);
