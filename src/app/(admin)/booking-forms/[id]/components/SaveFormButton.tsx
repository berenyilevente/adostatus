import { Button } from '@/components';
import { useEditBookingForm } from '../use-edit-booking-form';
import { FormStatus } from '@/generated/prisma';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { updateFormContent as updateFormContentAction } from '../../actions';

export const SaveFormButton = () => {
  const { formData, elements, setSelectedElement } = useEditBookingForm();
  const [loading, startTransition] = useTransition();

  const saveForm = async () => {
    if (!formData?.id) {
      throw new Error('Form ID not found');
    }

    if (elements.length === 0) {
      toast.error('Form must have at least one element');
      return;
    }

    const JsonElements = JSON.stringify(elements);

    const response = await updateFormContentAction(formData.id, JsonElements);
    if (response.status === 'success') {
      toast.success('Form content updated successfully');
      setSelectedElement(null);
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
