"use client";

import React, { ReactElement } from "react";
import { Control } from "react-hook-form";

import { TextInput } from "@/components/FormInputs/TextInput/TextInput";

export const TableSearch = ({
  filterControl,
}: {
  filterControl: Control<any>;
}): ReactElement => {
  return (
    <div className="flex m-4">
      <TextInput
        startIcon="search"
        control={filterControl}
        name="search"
        size="sm"
        placeholder="Search all columns..."
      />
    </div>
  );
};
