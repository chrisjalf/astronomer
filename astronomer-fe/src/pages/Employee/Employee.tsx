import { useState } from "react";

const defaultEmployee = {
  name: "",
  department: "",
  active: false,
  number: undefined,
  email: "",
  address: ["", "", ""],
};

export default function Employee() {
  const [employee, setEmployee] = useState(defaultEmployee);

  function handleEmployeeChange(
    employeeItem: string,
    newValue: string | number | boolean
  ) {
    setEmployee((prevEmployee) => {
      return {
        ...prevEmployee,
        [employeeItem]: newValue,
      };
    });
  }

  /* function toggleEmployeeStatus() {
    setEmployee((prevEmployee) => {
      return {
        ...prevEmployee,
        active: !prevEmployee.active,
      };
    });
  } */

  /* function resetEmployee() {
    setEmployee(defaultEmployee);
  } */

  return (
    <div className="container-sm card mt-5">
      {/* He */}
      {`${employee.active}`}
      {/* llo */}
      <div className="row p-4">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={employee.name}
              onChange={(event) =>
                handleEmployeeChange("name", event.target.value)
              }
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              value={employee.department}
              onChange={(event) =>
                handleEmployeeChange("department", event.target.value)
              }
            >
              <option hidden>Please select a department</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Security">Security</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Status</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={employee.active}
                onChange={() =>
                  handleEmployeeChange("active", !employee.active)
                }
              />
              <label className="form-check-label">Active</label>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Number</label>
            <input
              type="number"
              className="form-control"
              value={employee.number}
              onChange={(event) =>
                handleEmployeeChange("number", event.target.value)
              }
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={employee.email}
              onChange={(event) =>
                handleEmployeeChange("email", event.target.value)
              }
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" className="form-control mb-2" />
            <input type="text" className="form-control mb-2" />
            <input type="text" className="form-control" />
          </div>
        </div>
      </div>
    </div>
  );
}
