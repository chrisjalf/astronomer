import { Employee } from "../../types";

type ModalProps = {
  title: string;
  closeText: string;
  employee: Employee;
};

export default function EmployeeModal(props: ModalProps) {
  const { title, closeText, employee } = props;

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
          <div className="modal-body">
            <dl className="row mb-0">
              <dt className="col-sm-3">Name</dt>
              <dd className="col-sm-9">{employee.name}</dd>

              <dt className="col-sm-3">Department</dt>
              <dd className="col-sm-9">{employee.department}</dd>

              <dt className="col-sm-3">Status</dt>
              <dd className="col-sm-9">{employee.status}</dd>

              <dt className="col-sm-3">Number</dt>
              <dd className="col-sm-9">{employee.number}</dd>

              <dt className="col-sm-3">Email</dt>
              <dd className="col-sm-9">{employee.email}</dd>

              <dt className="col-sm-3">Address</dt>
              <dd className="col-sm-9">
                <p className="mb-0">{employee.address1}</p>
                {employee.address2 && <p>{employee.address2}</p>}
              </dd>
            </dl>
          </div>
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
