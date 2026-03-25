'use client';

import { Card, CardContent, CardHeader, CardTitle, Icon } from '@/components';
import { config } from '@/config';

// todo rephrase and move to docs
// A useful component when your product is challenging the status quo.
// Highlight the current pain points (left) and how your product is solving them (right)
// Try to match the lines from left to right, so the user can easily compare the two columns
export const Compare = () => {
  const withoutProduct = [
    'Hours wasted configuring basic features like user auth, payments, and emails.',
    'Inconsistent codebase',
    'Prolonged launch of projects',
    'Frustration from getting stuck on repetitive tasks',
    'Not being able to focus on the core product',
    'Debugging issues with basic features like Stripe, Auth, Emails, and more.',
  ];

  const withProduct = [
    'Hours saved with pre-configured, ready-to-use components and integrations.',
    'Consistent codebase thanks to pre-built modules.',
    'App launches in days, not months',
    'Maximized speed and consistency.',
    'Focus on the core product',
    'No more repetitive coding',
    'Everything in one place - Stripe, Auth, Emails, and more.',
  ];

  return (
    <section className="bg-base-100 pt-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-0">
        <h2 className="text-center text-pretty text-4xl font-semibold tracking-tight mb-8">
          Tired of spending hours configuring basic features?
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8 md:gap-12">
          <Card className="w-full ">
            <CardHeader>
              <CardTitle>
                <span className="text-red-500">Without </span>
                {config.app.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {withoutProduct.map((item, index) => (
                  <li key={index} className="flex gap-2 items-center text-base">
                    <Icon icon="xCircle" className="shrink-0 opacity-75 text-red-500" size="xs" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="w-full ">
            <CardHeader>
              <CardTitle>
                <span className="text-green-500">With </span>
                {config.app.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {withProduct.map((item, index) => (
                  <li key={index} className="flex gap-2 items-center text-base">
                    <Icon
                      icon="check"
                      className="w-4 h-4 shrink-0 opacity-75 text-green-500"
                      size="xs"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
