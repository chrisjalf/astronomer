import { ChangeEvent, useRef, useState } from "react";

const initialEmployee: {
  name: string;
  department: string;
  active: boolean;
  number?: number;
  email: string;
  address: string[];
  photo?: File;
} = {
  name: "",
  department: "",
  active: false,
  number: undefined,
  email: "",
  address: ["", "", ""],
  photo: undefined,
};

export default function Employee() {
  const [employee, setEmployee] = useState(initialEmployee);
  const employeeNameRef = useRef<HTMLInputElement>(null);
  const employeeDepartmentRef = useRef<HTMLSelectElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

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

  function handleEmployeePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file =
      event.target.files && event.target.files.length > 0
        ? event.target.files[0]
        : undefined;

    if (file) {
      setEmployee((prevEmployee) => {
        return {
          ...prevEmployee,
          photo: file,
        };
      });
    }
  }

  function clearEmployee() {
    setEmployee(initialEmployee);

    if (photoInputRef.current) photoInputRef.current.value = "";
  }

  function trigger() {
    console.log(employeeDepartmentRef?.current?.value);
  }

  return (
    <div className="container-sm card mt-5">
      <div className="row p-4">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" ref={employeeNameRef} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              /* value={employeeDepartment}
              onChange={(event) => changeEmployeeDepartment(event.target.value)} */
              ref={employeeDepartmentRef}
            >
              <option hidden value="">Please select a department</option>
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
        {employee.photo ? (
          <div className="col-md-6">
            <div className="mb-3">Photo</div>
            <img
              src={URL.createObjectURL(employee.photo)}
              className="img-thumbnail"
              alt="employee-image"
            ></img>
          </div>
        ) : null}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(event) => handleEmployeePhoto(event)}
              ref={photoInputRef}
            />
          </div>
        </div>
        <div className="col-md-12 text-end">
          <button
            className="btn btn-secondary"
            type="reset"
            onClick={clearEmployee}
          >
            Clear
          </button>
          <button
            className="btn btn-primary ms-2"
            type="submit"
            onClick={trigger}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
