type ModalProps = {
  title: string;
  body: string;
  closeText: string;
  confirmText: string;
  confirm: () => void;
};

export default function ActionableModal(props: ModalProps) {
  return (
    <div
      className="modal fade"
      id="deleteEmployeeModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {props.title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{props.body}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {props.closeText}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={props.confirm}
            >
              {props.confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
