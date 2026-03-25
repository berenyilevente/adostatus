import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
  Row,
  Column,
} from '@react-email/components';

import { BASE_URL, config } from '@/config';

export const LoginEmail = ({ url, host }: { url: string; host: string }) => {
  const logoUrl =
    'https://appointiq.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.29d07749.png&w=48&q=75';

  return (
    <Html>
      <Head />
      <Preview>Log in with this magic link</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Log in to {config.app.name}</Heading>

          <Link
            href={url}
            target="_blank"
            style={{ ...link, display: 'block', marginBottom: '16px' }}
          >
            Click here to log in with this magic link
          </Link>

          <Text
            style={{
              ...text,
              color: '#ababab',
              marginTop: '14px',
              marginBottom: '16px',
            }}
          >
            If you didn&apos;t try to login, you can safely ignore this email.
          </Text>

          <Img className="rounded-full" src={logoUrl} width="48" height="48" alt="logo" />

          <Text style={footer}>
            <Link href={BASE_URL} target="_blank" style={{ ...link, color: '#898989' }}>
              {config.app.name}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = { backgroundColor: '#ffffff' };

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
};

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '32px 0',
  padding: '0',
};

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
};

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
};
