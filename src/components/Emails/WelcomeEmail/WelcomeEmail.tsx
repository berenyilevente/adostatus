import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

import { BASE_URL, config } from "@/config";

export const WelcomeEmail = () => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img src={`${BASE_URL}/logo.png`} width="49" height="49" alt="logo" />
          <Hr style={hr} />
          <Text style={paragraph}>
            Thanks for joining the {config.app.name} waitlist!
          </Text>
          <Text style={paragraph}>You have secured your discount! 🤑</Text>
          <Text style={paragraph}>
            We will notify you about the launch date.
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>— The {config.app.name} team</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

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
