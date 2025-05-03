import { Label, Input, Textarea, Switch, Button } from "@/components";
import { FormSchemaType } from "../../booking-form.helper";

export const FormSettings = ({
  formData,
  onUpdate,
}: {
  formData: any;
  onUpdate: (key: keyof FormSchemaType, value: any) => void;
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="form-name">Form Name</Label>
        <Input
          id="form-name"
          value={formData.name}
          onChange={(e) => onUpdate("name", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="form-description">Description</Label>
        <Textarea
          id="form-description"
          value={formData.description || ""}
          onChange={(e) => onUpdate("description", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="confirmation-message">Confirmation Message</Label>
        <Textarea
          id="confirmation-message"
          value={formData.confirmationMessage || ""}
          onChange={(e) => onUpdate("confirmationMessage", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="redirect-url">Redirect URL (Optional)</Label>
        <Input
          id="redirect-url"
          value={formData.redirectUrl || ""}
          onChange={(e) => onUpdate("redirectUrl", e.target.value)}
          placeholder="https://example.com/thank-you"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="allow-cancellation"
          checked={formData.allowCancellation}
          onCheckedChange={(checked) => onUpdate("allowCancellation", checked)}
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
              onUpdate("cancellationNoticeHours", parseInt(e.target.value))
            }
          />
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Switch
          id="is-active"
          checked={formData.isActive}
          onCheckedChange={(checked) => onUpdate("isActive", checked)}
        />
        <Label htmlFor="is-active">Form Active</Label>
      </div>
      <div className="flex justify-end">
        <Button>Save</Button>
      </div>
    </div>
  );
};
