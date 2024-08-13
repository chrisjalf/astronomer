import { useContext } from "react";

import { EmployeeContext } from "../../store/index";

export default function EmployeeList() {
  const { employees, selectEmployee, deleteEmployee } =
    useContext(EmployeeContext);

  return (
    <div className="container my-5">
      <h3 className="mb-3">List of Employee</h3>
      {employees.length > 0 && (
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
                      <button type="button" className="btn btn-primary">
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
                        onClick={() => deleteEmployee(employee)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
