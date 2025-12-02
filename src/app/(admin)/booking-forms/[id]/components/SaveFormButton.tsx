import { Button } from '@/components';
import { useEditBookingForm } from '../use-edit-booking-form';
import { FormStatus } from '@/generated/prisma';

export const SaveFormButton = () => {
  const { formData, saveForm, loading, startTransition } = useEditBookingForm();

  if (formData?.status === FormStatus.LIVE) {
    return null;
  }

  return (
    <Button
      size="sm"
      type="button"
      disabled={loading}
      isLoading={loading}
      onClick={() => startTransition(() => saveForm())}
      fullWidth
    >
      Save Changes
    </Button>
  );
};
