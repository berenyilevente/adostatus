'use client';

import { Image } from '@/components';

import { cn } from '@/utils';

import logo from '../../../public/logo.svg';

type ILogoProps = {
  size?: number;
  className?: string;
  text?: string;
  textPosition?: 'left' | 'right' | 'top' | 'bottom';
};

export const Logo = ({ size = 24, className, text, textPosition = 'right' }: ILogoProps) => {
  const classNames = cn('inline', className, {
    'flex items-center gap-2': text,
    'flex-col': textPosition === 'bottom',
    'flex-col-reverse': textPosition === 'top',
    'flex-row': textPosition === 'right',
    'flex-row-reverse': textPosition === 'left',
  });

  return (
    <div className={classNames}>
      <Image src={logo} height={size} alt="logo" className="inline" />
      {text && <span className="text-xl font-bold text-primary">{text}</span>}
    </div>
  );
};

Logo.displayName = 'Logo';
