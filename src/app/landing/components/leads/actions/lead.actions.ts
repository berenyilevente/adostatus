// "use server";

// import { Response } from "@/types/action.types";

// import { config } from "@/config";
// import { resend } from "@/lib/email/resend";
// import { WelcomeEmail } from "@/components/email/welcome.email";
// import { NewLeadEmail } from "@/components/email/new-lead.email";
// import client from "@/lib/prisma/client";

// export const saveLead = async (email: string): Promise<Response<any>> => {
//   if (!email) {
//     return {
//       status: "error",
//       error: "Email is required",
//       code: 400,
//       data: null,
//     };
//   }

//   const existingLead = await client.lead.findUnique({ where: { email } });

//   if (existingLead) {
//     return {
//       status: "error",
//       error: "Email already exists",
//       code: 409,
//       data: null,
//     };
//   }

//   const data = await client.lead.create({ data: { email } });

//   if (data) {
//     await resend.emails.send({
//       from: config.resend.fromNoReply,
//       to: [email],
//       subject: "Welcome to SwiftBlocks!",
//       text: "We will be in touch soon",
//       react: WelcomeEmail(),
//     });

//     await resend.emails.send({
//       from: config.resend.fromNoReply,
//       to: [config.resend.forwardRepliesTo],
//       subject: "New lead has joined the SwiftBlocks waitlist!",
//       react: NewLeadEmail({ email }),
//     });
//     return {
//       status: "success",
//       data,
//       code: 200,
//       errors: undefined,
//     };
//   }

//   return {
//     status: "error",
//     error: "Something went wrong",
//     code: 500,
//     data: undefined,
//   };
// };
