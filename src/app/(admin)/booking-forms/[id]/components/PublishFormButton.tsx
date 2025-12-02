import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@/components';
import { useTransition } from 'react';
import { useEditBookingForm } from '../use-edit-booking-form';
import { toast } from 'sonner';
import { publishForm as publishFormAction } from '../../actions';
import { useRouter } from 'next/navigation';
import { FormStatus } from '@/generated/prisma';
import { FormElementInstance } from '../edit-form.helper';

const validateForm = (elements: FormElementInstance[]): boolean => {
  if (elements.length === 0) {
    toast.error('Form must have at least one element');
    return false;
  }

  const hasDateField = elements.some(
    (element) =>
      element?.type === 'DateField' || element?.type === 'BookingDateField'
  );

  const hasStartTimeField = elements.some(
    (element) => element?.extraAttributes?.timeType === 'startTime'
  );

  const hasEndTimeField = elements.some(
    (element) => element?.extraAttributes?.timeType === 'endTime'
  );

  if (!hasDateField) {
    toast.error('Form must have a date field');
    return false;
  }

  if (!hasStartTimeField) {
    toast.error('Form must have a start time field');
    return false;
  }

  if (!hasEndTimeField) {
    toast.error('Form must have an end time field');
    return false;
  }

  return true;
};

export const PublishFormButton = () => {
  const [loading, startTransition] = useTransition();
  const { formData, elements } = useEditBookingForm();
  const router = useRouter();

  const publishForm = async () => {
    if (!formData?.id) {
      throw new Error('Form ID not found');
    }

    const response = await publishFormAction(
      formData.id,
      JSON.stringify(elements)
    );

    if (response.status === 'success') {
      toast.success('Your form is now published and ready to use.');
      router.refresh();
      return;
    }

    if (response.status === 'error') {
      toast.error(response.error);
      return;
    }
  };

  if (formData?.status === FormStatus.LIVE) {
    return null;
  }

  const onDialogOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!validateForm(elements)) {
      e.preventDefault();
      return;
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="w-full"
          size="sm"
          type="button"
          onClick={onDialogOpen}
        >
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-medium">
              By publishing this form, it will be available to your customers
              and you will be able to track the bookings made through this form.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                startTransition(publishForm);
              }}
              isLoading={loading}
            >
              Publish
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
