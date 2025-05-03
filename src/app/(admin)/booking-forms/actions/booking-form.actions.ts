"use server";

import prisma from "@/lib/prisma/client";
import { isAuthenticated } from "@/lib/auth";

export const getBookingForms = async () => {
  await isAuthenticated();

  try {
    const forms = await prisma.form.findMany();

    return {
      status: "success",
      data: forms,
      code: 200,
      errors: undefined,
    };
  } catch (error) {
    console.error("Error fetching forms:", error);
    return {
      status: "error",
      data: undefined,
      code: 500,
      errors: "Failed to fetch forms",
    };
  }
};

export const getForm = async (id: string) => {
  await isAuthenticated();

  try {
    const form = await prisma.form.findUnique({
      where: { id },
      include: {
        fields: true,
      },
    });

    return {
      status: "success",
      data: form,
      code: 200,
      errors: undefined,
    };
  } catch (error) {
    console.error("Error fetching form:", error);
    return {
      status: "error",
      data: undefined,
      code: 500,
      errors: "Failed to fetch form",
    };
  }
};

export const createForm = async (formData: any): Promise<any> => {
  await isAuthenticated();

  try {
    // In a real implementation, you would create the form in the database
    // For now, we'll just return a mock response
    return {
      status: "success",
      data: { id: "mock-form-id", ...formData },
      code: 200,
      errors: undefined,
    };
  } catch (error) {
    console.error("Error creating form:", error);
    return {
      status: "error",
      data: undefined,
      code: 500,
      errors: "Failed to create form",
    };
  }
};
