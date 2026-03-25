import Link from 'next/link';
import { ReactElement } from 'react';
import { Button, ButtonProps } from './button';

interface ButtonLinkProps extends ButtonProps {
  href: string;
}

export const ButtonLink = ({ href, children, ...props }: ButtonLinkProps): ReactElement => {
  return (
    <Link href={href}>
      <Button {...props}>{children}</Button>
    </Link>
  );
};
