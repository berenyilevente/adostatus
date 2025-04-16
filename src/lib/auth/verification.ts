import { config } from "@/config";
import { resend } from "@/lib/email/resend";
import { LoginEmail } from "../../components/email/login.email";

type SendVerificationRequestParams = {
  identifier: string;
  url: string;
};

export async function sendVerificationRequest(
  params: SendVerificationRequestParams
) {
  const { identifier, url } = params;
  const { host } = new URL(url);

  try {
    const data = await resend.emails.send({
      from: config.resend.fromNoReply,
      to: [identifier],
      subject: `Log in to ${host}`,
      text: text({ url, host }),
      react: LoginEmail({ url, host }),
    });
    return { success: true, data };
  } catch (error) {
    throw new Error("Failed to send the verification Email.", {
      cause: error,
    });
  }
}

function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
