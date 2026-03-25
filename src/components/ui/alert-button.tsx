'use client';

import { ComponentProps, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  LoadingSwap,
  AlertDialog,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components';

interface AlertButtonProps extends ComponentProps<typeof Button> {
  title?: string;
  confirmActionDescription?: ReactNode;
  isLoading?: boolean;
  onSubmit: () => void;
}

export const AlertButton = ({
  title = 'Are you sure?',
  confirmActionDescription = 'This action cannot be undone.',
  isLoading = false,
  onSubmit,
  ...props
}: AlertButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...props} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{confirmActionDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={onSubmit}>
            <LoadingSwap isLoading={isLoading}>Yes</LoadingSwap>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
