import { stripe } from './stripe.config';
import { Config } from '../types/config.type';
import { resend } from './resend.config';
import { BASE_URL } from './env.config';

export const config: Config = {
  app: {
    name: 'Tax Tracker',
    description: 'Tax Tracker is the best tax tracking platform for your business.',
    domain: BASE_URL,
  },
  resend,
  db: {
    name: 'taxTrackerDB',
  },
  stripe,
};
