"use-client";

import { forwardRef, ReactNode } from "react";

interface ModalProps {
  id: string;
  children: ReactNode;
  title?: string;
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ id, children, title }, ref) => {
    return (
      <dialog id={id} className="modal" ref={ref}>
        <div className="modal-box">
          <div className="pb-4">
            {title && <h3 className="text-lg font-bold">{title}</h3>}
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
          {children}
        </div>
      </dialog>
    );
  }
);
