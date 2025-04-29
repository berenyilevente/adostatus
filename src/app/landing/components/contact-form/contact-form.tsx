"use client";

import React from "react";
import { useForm } from "react-hook-form";

import { FormInput, FormWrapper } from "@/components";

export const ContactForm: React.FC = () => {
  const form = useForm();

  return (
    <FormWrapper form={form} className="container pt-24">
      <>
        <div className="text-center text-2xl font-bold mb-4">Get in touch!</div>
        <div className="w-1/2 mx-auto space-y-4">
          <FormInput
            control={form.control}
            name="email"
            placeholder="Email"
            startIcon="mail"
          />
          <FormInput
            control={form.control}
            name="firstName"
            placeholder="First Name"
            startIcon="user"
          />
          <FormInput
            control={form.control}
            name="lastName"
            placeholder="Last Name"
            startIcon="user"
          />
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Description"
          />
          <button className="btn btn-primary w-full">Submit</button>
        </div>
      </>
    </FormWrapper>
  );
};
