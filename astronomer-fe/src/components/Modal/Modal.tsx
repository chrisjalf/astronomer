import { ReactNode } from "react";

type ModalProps = {
  title: string;
  closeText: string;
  children: ReactNode;
};

export default function Modal(props: ModalProps) {
  const { title, closeText, children } = props;

  return (
    <div
      className="modal fade"
      id="employeeModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {closeText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
