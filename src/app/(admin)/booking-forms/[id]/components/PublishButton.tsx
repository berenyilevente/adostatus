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

export const PublishButton = () => {
  const [loading, startTransition] = useTransition();
  const { formData } = useEditBookingForm();
  const router = useRouter();

  const publishForm = async () => {
    if (!formData?.id) {
      throw new Error('Form ID not found');
    }

    const response = await publishFormAction(formData.id);
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

  if (formData?.status === 'live') {
    return null;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" size="sm" type="button">
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
