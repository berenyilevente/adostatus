import EmailProvider from 'next-auth/providers/email';

import { config, EMAIL_SERVER } from '@/config';
import { sendVerificationRequest } from './verification';

export const emailProvider = EmailProvider({
  server: EMAIL_SERVER,
  from: config.resend.fromNoReply,
  sendVerificationRequest({ identifier: email, url }) {
    sendVerificationRequest({
      identifier: email,
      url,
    });
  },
});
