import { Label, Input, Textarea, Switch, Button } from "@/components";

import { useCreateBookingForm } from "../use-create-booking-form";

export const FormSettings = () => {
  const { formData, updateFormData } = useCreateBookingForm();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="form-name">Form Name</Label>
        <Input
          id="form-name"
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="form-description">Description</Label>
        <Textarea
          id="form-description"
          value={formData.description || ""}
          onChange={(e) => updateFormData("description", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="confirmation-message">Confirmation Message</Label>
        <Textarea
          id="confirmation-message"
          value={formData.confirmationMessage || ""}
          onChange={(e) =>
            updateFormData("confirmationMessage", e.target.value)
          }
        />
      </div>

      <div>
        <Label htmlFor="redirect-url">Redirect URL (Optional)</Label>
        <Input
          id="redirect-url"
          value={formData.redirectUrl || ""}
          onChange={(e) => updateFormData("redirectUrl", e.target.value)}
          placeholder="https://example.com/thank-you"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="allow-cancellation"
          checked={formData.allowCancellation}
          onCheckedChange={(checked) =>
            updateFormData("allowCancellation", checked)
          }
        />
        <Label htmlFor="allow-cancellation">
          Allow Appointment Cancellation
        </Label>
      </div>

      {formData.allowCancellation && (
        <div>
          <Label htmlFor="cancellation-notice">
            Cancellation Notice (Hours)
          </Label>
          <Input
            id="cancellation-notice"
            type="number"
            min="0"
            value={formData.cancellationNoticeHours}
            onChange={(e) =>
              updateFormData(
                "cancellationNoticeHours",
                parseInt(e.target.value)
              )
            }
          />
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Switch
          id="is-active"
          checked={formData.isActive}
          onCheckedChange={(checked) => updateFormData("isActive", checked)}
        />
        <Label htmlFor="is-active">Form Active</Label>
      </div>
      <div className="flex justify-end">
        <Button>Save</Button>
      </div>
    </div>
  );
};
