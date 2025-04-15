"use client";

import React, { ForwardedRef, forwardRef } from "react";

import { Controller, useForm } from "react-hook-form";
import { IconType } from "@/components";
import { useAutocomplete } from "./use-autocomplete";

interface AutocompleteProps {
  suggestions: string[];
  name: string;
  id?: string;
  label?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: any;
  type?: "text" | "email" | "tel" | "number";
  className?: string;
  variant?: "" | "input-bordered";
  startIcon?: IconType;
  endIcon?: IconType;
}

const AutocompleteComponent = (
  {
    suggestions,
    id,
    name,
    label,
    placeholder,
    error,
    type = "text",
    variant = "input-bordered",
    className,
    startIcon,
    endIcon,
    onChange,
  }: AutocompleteProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { control } = useForm();
  const {
    inputValue,
    filteredSuggestions,
    activeSuggestionIndex,
    onInputChange,
    onSelect,
    onClearInput,
    onKeyDown,
  } = useAutocomplete({ suggestions, onChange });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div {...field} ref={ref}>
          <div className="form-control">
            {label && (
              <label htmlFor={id} className="label">
                <span className="label-text">{label}</span>
              </label>
            )}
            <label
              className={`input ${variant} ${className} flex items-center gap-2 ${
                error ? "input-error" : ""
              }`}
            >
              <input
                id={id}
                name={name}
                ref={ref}
                type={type}
                onChange={onInputChange}
                placeholder={placeholder}
                onKeyDown={(event) => onKeyDown(event, field)}
                className="grow !outline-none"
                value={inputValue}
                autoComplete="off"
              />
              {inputValue ? (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    field.onChange();
                    onClearInput();
                  }}
                >
                  x
                </div>
              ) : (
                <></>
              )}
            </label>
            {error && (
              <span className="text-error text-start">{error as string}</span>
            )}
          </div>
          {filteredSuggestions.length ? (
            <div className="p-2 shadow menu dropdown-content z-50 bg-base-100 rounded-box w-max whitespace-nowrap">
              {filteredSuggestions.map((suggestion: string, index: number) => (
                <button
                  key={`${suggestion}${index}`}
                  onClick={() => {
                    field.onChange(suggestion);
                    onSelect(suggestion);
                  }}
                  className={`btn btn-ghost btn-md  !outline-none ${
                    activeSuggestionIndex === index
                      ? "!outline-none !bg-gray-100"
                      : ""
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    />
  );
};
export const Autocomplete = forwardRef(AutocompleteComponent);
