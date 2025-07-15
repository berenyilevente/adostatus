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
import { handleResponse } from '@/utils/handleResponse';

export const ActionButton = <T,>({
  action,
  isConfirmAction = false,
  confirmActionDescription = 'This action cannot be undone.',
  ...props
}: ComponentProps<typeof Button> & {
  action: () => Promise<Response<T>>;
  isConfirmAction?: boolean;
  confirmActionDescription?: ReactNode;
}) => {
  const [isLoading, startTransition] = useTransition();

  const performAction = async () => {
    startTransition(async () => {
      const data = await action();
      handleResponse(data);
    });
  };

  if (isConfirmAction) {
    return (
      <AlertDialog open={isLoading ? true : undefined}>
        <AlertDialogTrigger asChild>
          <Button {...props} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmActionDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isLoading} onClick={performAction}>
              <LoadingSwap isLoading={isLoading}>Yes</LoadingSwap>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Button
      {...props}
      disabled={props.disabled ?? isLoading}
      onClick={(e) => {
        performAction();
        props.onClick?.(e);
      }}
    />
  );
};
