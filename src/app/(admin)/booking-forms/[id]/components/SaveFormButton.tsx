import { Button, Spinner } from '@/components';
import { useEditBookingForm } from '../use-edit-booking-form';
import { useDesignerContext } from './context/DesignerContext';
import { updateFormContent as updateFormContentAction } from '../../actions';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { FormStatus } from '@/generated/prisma';

export const SaveFormButton = () => {
  const { formData } = useEditBookingForm();
  const { elements } = useDesignerContext();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    if (!formData?.id) {
      throw new Error('Form ID not found');
    }

    try {
      const JsonElements = JSON.stringify(elements);

      const response = await updateFormContentAction(formData.id, JsonElements);
      if (response.status === 'success') {
        toast.success('Form content updated successfully');
        return;
      }

      if (response.status === 'error') {
        toast.error(response.error);
        return;
      }
    } catch (error) {}
  };

  if (formData?.status === FormStatus.LIVE) {
    return null;
  }

  return (
    <Button
      className="w-full"
      size="sm"
      type="button"
      disabled={loading}
      isLoading={loading}
      onClick={() => startTransition(() => updateFormContent())}
    >
      Save Changes
    </Button>
  );
};
