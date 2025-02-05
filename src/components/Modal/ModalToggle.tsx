import { cn } from "@/utils/combineClassNames";
import { ReactElement } from "react";

export const ModalToggle = ({
  modalId,
  children,
  className,
}: {
  modalId: string;
  children: ReactElement;
  className?: string;
}): ReactElement => {
  const handleClick = () => {
    const modal: HTMLDialogElement | null = document.getElementById(
      modalId
    ) as HTMLDialogElement;

    if (!modal) {
      throw new Error(`Modal with id ${modalId} not found`);
    }

    modal.showModal();
  };

  return (
    <div className={cn(className)} onClick={handleClick}>
      {children}
    </div>
  );
};
