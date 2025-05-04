import type { Metadata } from "next";

import { PageTitle } from "../../components";
import { CreateBookingFormProvider } from "./use-create-booking-form";
import { FormBuilder } from "./CreateBookingForm";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Forms",
};

//TODO: Replicate the shadcn form builder from here: https://www.shadcn-form.com/playground
const CreateBookingFormPage = async () => {
  return (
    <CreateBookingFormProvider formsData={[]}>
      <PageTitle
        title={"Create Booking Form"}
        breadcrumbs={[
          { label: "Booking Forms", path: routes.admin.bookingForms.index },
          { label: "Create Booking Form", active: true },
        ]}
      />
      <div className="mt-5">
        <FormBuilder />
      </div>
    </CreateBookingFormProvider>
  );
};

export default CreateBookingFormPage;
