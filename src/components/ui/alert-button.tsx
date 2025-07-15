'use client';

import { type ComponentProps, type ReactNode, useTransition } from 'react';
import { Response } from '@/types/action.types';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
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

export const AlertButton = <T,>({
  title = 'Are you sure?',
  confirmActionDescription = 'This action cannot be undone.',
  isLoading = false,
  onSubmit,
  ...props
}: ComponentProps<typeof Button> & {
  title?: string;
  confirmActionDescription?: ReactNode;
  isLoading?: boolean;
  onSubmit: () => void;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...props} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {confirmActionDescription}
          </AlertDialogDescription>
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
