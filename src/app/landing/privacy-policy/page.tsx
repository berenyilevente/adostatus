import Link from "next/link";

import { getSEOTags } from "@/lib/seo/seo";
import { config } from "@/config";

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.app.name}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.app.name}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: January 29, 2025

Welcome to SwiftBlocks! Your privacy is important to us. Below is an outline of how we collect, use, and protect your information.

Information We Collect
	•	Personal Data: We collect your email address when you join our waitlist.
	•	Non-Personal Data: We use web cookies to gather non-identifiable information to improve our website experience.

How We Use Your Information
	•	Your email address is used solely for managing our waitlist and communicating updates about SwiftBlocks.

Data Sharing
	•	We do not share your information with third parties.

Children’s Privacy
	•	SwiftBlocks does not knowingly collect any information from children.

Updates to This Privacy Policy
	•	We may update this policy from time to time. If significant changes are made, we will notify you via email.

Contact Us

If you have any questions or concerns about this Privacy Policy, please contact us at support@swiftblocks.net.

Thank you for trusting SwiftBlocks!

By using SwiftBlocks, you consent to the terms of this Privacy Policy.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
