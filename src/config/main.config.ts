import { stripe } from './stripe.config';
import { Config } from '../types/config.type';
import { resend } from './resend.config';
import { BASE_URL } from './env.config';

export const config: Config = {
  app: {
    name: 'AppointIQ',
    description: 'AppointIQ is the best scheduling platform for your business.',
    domain: BASE_URL,
  },
  resend,
  db: {
    name: 'appointiqdb',
  },
  stripe,
};
