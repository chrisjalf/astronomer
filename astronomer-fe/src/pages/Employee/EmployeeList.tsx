import { useContext } from "react";

import EmployeeModal from "./EmployeeModal";
import DeleteEmployeeModal from "./DeleteEmployeeModal";

import { EmployeeContext } from "../../store/index";

export default function EmployeeList() {
  const { employees, selectEmployee, deleteEmployee } =
    useContext(EmployeeContext);

  return (
    <div className="container my-5">
      <h3 className="mb-3">List of Employee</h3>
      {employees.length > 0 ? (
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
                        data-bs-target="#deleteEmployeeModal"
                      >
                        Delete
                      </button>
                      <EmployeeModal
                        title={"View Employee"}
                        closeText={"Close"}
                        employee={employee}
                      />
                      <DeleteEmployeeModal
                        title={`Deleting Employee (${employee.name})`}
                        body={"This action cannot be undone. Proceed?"}
                        closeText={"Close"}
                        confirmText={"Confirm"}
                        confirm={() => deleteEmployee(employee)}
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
