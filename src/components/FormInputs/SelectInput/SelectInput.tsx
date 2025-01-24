"use client";

import { useOutsideClickHandler } from "@/hooks/use-outside-click-handler";
import { HTMLAttributes, ReactElement } from "react";

interface SelectInputProps extends HTMLAttributes<HTMLDivElement> {
  options: string[];
  name: string;
  placeholder?: string;
  value?: string;
}

export const SelectInput = ({
  options,
  name,
  placeholder,
  value,
  ...props
}: SelectInputProps): ReactElement => {
  const { visible, setVisible } = useOutsideClickHandler(false);

  const onSelect = (option: string) => {
    setVisible(false);
  };

  return (
    <div
      {...props}
      className={`dropdown w-full dropdown-bottom  ${visible ? "open" : ""}`}
    >
      <div
        tabIndex={0}
        className={`m-1 select select-bordered  w-full flex justify-between items-center`}
        onClick={() => setVisible(!visible)}
      >
        {value || placeholder}
      </div>
      {visible && (
        <ul
          tabIndex={0}
          className="p-2 shadow menu dropdown-content z-50 bg-base-100 rounded-box w-max whitespace-nowrap"
        >
          {options.map((option, index) => (
            <li key={index}>
              <a onClick={() => onSelect(option)}>
                {option as React.ReactNode}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
