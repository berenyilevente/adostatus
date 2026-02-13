import { config } from '@/config';

export const faqs = [
  {
    title: `How is ${config.app.name} different from other scheduling tools?`,
    content: `${config.app.name} is specifically designed for businesses that need multiple scheduling forms for different services or business types. Unlike other tools that require separate accounts for each business, ${config.app.name} lets you manage everything from one dashboard with a single subscription.`,
  },
  {
    title: 'Can I customize the booking forms for different businesses?',
    content: `Absolutely! ${config.app.name}'s form builder lets you create completely custom booking forms with different fields, branding, and validation rules for each business type. You can even use our pre-built templates as starting points.`,
  },
  {
    title: 'How do I embed the booking forms on my website?',
    content: `${config.app.name} provides simple embed codes that you can copy and paste into your website. We support direct HTML embedding, WordPress integration, and Webflow components. You can also use our hosted booking page if you prefer not to embed the form.`,
  },
  {
    title: 'Can my team members access the system?',
    content:
      "Yes, you can invite team members as Basic Users and control which booking forms and calendars they can access. This is perfect for staff who need to view appointments but shouldn't have admin privileges.",
  },
  {
    title: 'Do you offer a free trial?',
    content:
      'Yes! We offer a 14-day free trial of our Business Pro plan with no credit card required. You can also use our free Starter plan indefinitely with limited features.',
  },
  {
    title: 'Can I export my appointment data?',
    content:
      'Yes, you can export your appointment data to CSV or integrate with popular calendar applications like Google Calendar, Outlook, and Apple Calendar.',
  },
];
