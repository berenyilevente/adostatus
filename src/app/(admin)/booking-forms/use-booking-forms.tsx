"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Form } from "@/generated/prisma";

import {
  Button,
  Image,
  TableCheckbox,
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components";
import { createAppContext } from "@/hooks/use-create-app-context";

type HookProp = {
  bookingFormsData: Form[];
};

const useHook = ({ bookingFormsData }: HookProp) => {
  const filterForm = useForm({
    defaultValues: {
      search: "",
      business: "",
    },
  });

  const { watch, setValue } = filterForm;

  const search = watch("search");

  return {
    search,
    filterForm,
  };
};

const [useBookingForms, BookingFormsProvider] = createAppContext(useHook);

export { useBookingForms, BookingFormsProvider };
