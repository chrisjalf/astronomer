import { useContext } from "react";
import { createPortal } from "react-dom";
import { Toast, ToastContainer } from "react-bootstrap";

import Modal from "../../components/Modal/Modal";
import ActionableModal from "../../components/ActionableModal/ActionableModal";

import { EmployeeContext } from "../../store/index";

export default function EmployeeList() {
  const {
    employees,
    isFetchingEmployees,
    showFetchEmployeesToast,
    fetchEmployeesToast,
    selectEmployee,
    deleteEmployee,
    resetFetchEmployeesToast,
  } = useContext(EmployeeContext);

  return (
    <div className="container my-5">
      {createPortal(
        <ToastContainer
          className="p-3"
          position={"top-end"}
          style={{ zIndex: 1 }}
        >
          <Toast
            show={showFetchEmployeesToast}
            onClose={resetFetchEmployeesToast}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">
                {fetchEmployeesToast?.title ?? "Error"}
              </strong>
            </Toast.Header>
            <Toast.Body>
              {fetchEmployeesToast?.message ?? "Something went wrong"}
            </Toast.Body>
          </Toast>
        </ToastContainer>,
        document.body
      )}
      <h3 className="mb-3">List of Employee</h3>
      {isFetchingEmployees && (
        <p className="fs-5 text-body-secondary text-center">Loading...</p>
      )}
      {!isFetchingEmployees && employees.length > 0 ? (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.status}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#employeeModal"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => selectEmployee(employee)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target={`#deleteEmployeeModal-${index}`}
                      >
                        Delete
                      </button>
                      <Modal title={"View Employee"} closeText={"Close"}>
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
                      </Modal>
                      <ActionableModal
                        id={`deleteEmployeeModal-${index}`}
                        title={`Deleting Employee (${employee.name})`}
                        body={"This action cannot be undone. Proceed?"}
                        closeText={"Close"}
                        confirmText={"Confirm"}
                        confirm={() => deleteEmployee(employee.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="fs-5 text-body-secondary text-center">
          No employees found
        </p>
      )}
    </div>
  );
}
