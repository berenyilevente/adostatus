'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Form,
} from '@/components';
import { FormInput } from '@/components/form/form-input';
import { inviteClientSchema, InviteClientInput } from '../schemas/clients.schemas';
import { useClients } from '../use-clients';

export const InviteClientDialog = () => {
  const { isInviteOpen, setIsInviteOpen, isLoading, onInviteClient } = useClients();

  const form = useForm<InviteClientInput>({
    resolver: zodResolver(inviteClientSchema),
    defaultValues: { email: '', firstName: '', lastName: '' },
  });

  const onSubmit = async (data: InviteClientInput) => {
    await onInviteClient(data);
    form.reset();
  };

  return (
    <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Új ügyfél meghívása</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              control={form.control}
              name="email"
              label="E-mail cím"
              placeholder="pelda@email.com"
              type="email"
              required
            />
            <FormInput
              control={form.control}
              name="lastName"
              label="Vezetéknév"
              placeholder="Kovács"
              required
            />
            <FormInput
              control={form.control}
              name="firstName"
              label="Keresztnév"
              placeholder="János"
              required
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsInviteOpen(false)}>
                Mégse
              </Button>
              <Button type="submit" disabled={isLoading}>
                Meghívás
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
