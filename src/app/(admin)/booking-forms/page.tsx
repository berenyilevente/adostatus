import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Form } from "@/generated/prisma";

import { BookingFormList } from "./BookingFormList";
import { BookingFormsProvider } from "./use-booking-forms";
import { getBookingForms } from "./actions";
import { PageTitle } from "../components";

export const metadata: Metadata = {
  title: "Booking Forms",
};

const BookingForms = async () => {
  let bookingForms: Form[] = [];
  const rBookingForms = await getBookingForms();

  if (rBookingForms === null) {
    return notFound();
  }

  if (rBookingForms.status === "success" && rBookingForms.data) {
    bookingForms = rBookingForms.data;
  }

  return (
    <BookingFormsProvider bookingFormsData={bookingForms}>
      <PageTitle
        title={"Booking Forms"}
        breadcrumbs={[{ label: "Booking Forms", active: true }]}
      />
      <div className="mt-5">
        <BookingFormList />
      </div>
    </BookingFormsProvider>
  );
};

export default BookingForms;
