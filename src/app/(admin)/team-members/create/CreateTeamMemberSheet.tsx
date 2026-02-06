'use client';

import {
  Button,
  FormInput,
  FormSelect,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  FormWrapper,
  FormSwitch,
} from '@/components';
import { useCreateTeamMember } from './use-create-teamMember';
import { useTeamMembers } from '../use-teamMembers';
import { teamMemberRoles } from '../teamMember.helper';

export const CreateTeamMemberSheet = () => {
  const { form, onSubmit, isLoading } = useCreateTeamMember();
  const { businessOptions } = useTeamMembers();

  return (
    <Sheet modal>
      <SheetTrigger asChild id="create-team-member-trigger">
        <Button startIcon="plus" size="sm" iconSize="xs" color="primary">
          Create a new team member
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full w-[500px]">
        <SheetHeader>
          <SheetTitle>Create a new team member</SheetTitle>
          <SheetDescription>
            Create a new team member by selecting a business and filling the
            user's details.
            <br />
            <br />
            The team member will be able to access the business and its services
            and will be able to book appointments for the business.
          </SheetDescription>
        </SheetHeader>
        <FormWrapper form={form} className="flex gap-4 flex-col w-full mt-6">
          <FormSelect
            control={form.control}
            label="Business"
            name="businessId"
            placeholder="Select business"
            options={businessOptions}
          />
          <FormInput
            control={form.control}
            label="First Name"
            name="firstName"
            placeholder="Enter first name"
          />
          <FormInput
            control={form.control}
            label="Last Name"
            name="lastName"
            placeholder="Enter last name"
          />
          <FormInput
            control={form.control}
            label="Email"
            name="email"
            placeholder="Enter email"
          />
          <FormInput
            control={form.control}
            label="Phone"
            name="phone"
            placeholder="Enter phone number"
          />
          <FormSelect
            control={form.control}
            label="Role"
            name="role"
            placeholder="Select role"
            options={teamMemberRoles}
          />
          <FormSwitch
            control={form.control}
            label="Active Status"
            name="isActive"
            description="Enable or disable this team member's access"
          />
          <Button type="submit" onClick={onSubmit} isLoading={isLoading}>
            Create team member
          </Button>
        </FormWrapper>
      </SheetContent>
    </Sheet>
  );
};
