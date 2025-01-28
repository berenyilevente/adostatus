"use client";

import { TextInput } from "@/components";
import React from "react";
import { useForm } from "react-hook-form";

export const ContactForm: React.FC = () => {
  const { control, handleSubmit } = useForm();
  return (
    <form className="container pt-24">
      <div className="text-center text-2xl font-bold mb-4">Get in touch!</div>
      <div className="w-1/2 mx-auto space-y-4">
        <TextInput
          control={control}
          name="email"
          placeholder="Email"
          startIcon="mail"
        />
        <TextInput
          control={control}
          name="firstName"
          placeholder="First Name"
          startIcon="user"
        />
        <TextInput
          control={control}
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
    </form>
  );
};
