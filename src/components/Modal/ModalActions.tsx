import { ReactElement, ReactNode } from "react";

export const ModalActions = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  return (
    <div
      className="modal-action"
      onClick={() =>
        (
          document.getElementById("delete-user-modal") as HTMLDialogElement
        ).close()
      }
    >
      {children}
    </div>
  );
};
