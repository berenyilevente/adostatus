import { type ClassValue as ClassName, clsx } from 'clsx';
import { twMerge as merge } from 'tailwind-merge';

const combineClassNames = (...classNames: ClassName[]) => {
  const combinedClassNames = clsx(classNames);

  return merge(combinedClassNames);
};

export { combineClassNames as cn };
