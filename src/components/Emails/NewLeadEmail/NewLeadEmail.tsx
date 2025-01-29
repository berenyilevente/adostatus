import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

import { BASE_URL, config } from "@/config";

export const NewLeadEmail = ({ email }: { email: string }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Text style={paragraph}>
            New lead has joined the {config.app.name} waitlist!
          </Text>
          <Text style={paragraph}>Email: {email}</Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            <Img
              src={`${BASE_URL}/logo.png`}
              width="49"
              height="49"
              alt="logo"
            />
            — The {config.app.name} team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default NewLeadEmail;

const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};
