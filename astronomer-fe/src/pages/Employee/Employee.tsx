import { ChangeEvent, useEffect, useRef, useState } from "react";

type EmployeeFormError = {
  name?: string;
  department?: string;
  number?: string;
  email?: string;
  address?: string;
};

const initialEmployeeError: EmployeeFormError = {
  name: undefined,
  department: undefined,
  number: undefined,
  email: undefined,
  address: undefined,
};

export default function Employee() {
  // employee form fields
  const employeeNameRef = useRef<HTMLInputElement>(null);
  const employeeDepartmentRef = useRef<HTMLSelectElement>(null);
  const employeeActiveRef = useRef<HTMLInputElement>(null);
  const employeeNumberRef = useRef<HTMLInputElement>(null);
  const employeeEmailRef = useRef<HTMLInputElement>(null);
  const employeeAddress1Ref = useRef<HTMLInputElement>(null);
  const employeeAddress2Ref = useRef<HTMLInputElement>(null);
  const employeePhotoRef = useRef<HTMLInputElement>(null);
  const [photo, setEmployeePhoto] = useState<File | undefined>(undefined);
  const [didClickCreateEmployee, setDidClickCreateEmployee] = useState(false);

  // employee form error
  const [employeeError, setEmployeeError] = useState(initialEmployeeError);

  function handleEmployeePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file =
      event.target.files && event.target.files.length > 0
        ? event.target.files[0]
        : undefined;

    if (file) setEmployeePhoto(file);
  }

  function validateEmployeeInput(fieldName: string) {
    let errorMessage: string | undefined;

    switch (fieldName) {
      case "name": {
        if (employeeNameRef?.current?.value === "")
          errorMessage = "Name is required";
        else errorMessage = undefined;

        break;
      }
      case "department": {
        if (employeeDepartmentRef?.current?.value === "")
          errorMessage = "Department is required";
        else errorMessage = undefined;

        break;
      }
      case "number": {
        if (employeeNumberRef?.current?.value === "")
          errorMessage = "Number is required";
        else errorMessage = undefined;

        break;
      }
      case "email": {
        if (employeeEmailRef?.current?.value === "")
          errorMessage = "Email is required";
        else errorMessage = undefined;

        break;
      }
      case "address": {
        if (employeeAddress1Ref?.current?.value === "")
          errorMessage = "Address is required";
        else errorMessage = undefined;

        break;
      }
      default:
        break;
    }

    setEmployeeError((prevEmployeeError) => {
      return {
        ...prevEmployeeError,
        [fieldName]: errorMessage,
      };
    });
  }

  function checkEmployee() {
    const error: EmployeeFormError = {};

    if (employeeNameRef?.current?.value === "")
      error["name"] = "Name is required";
    else error["name"] = undefined;

    if (employeeDepartmentRef?.current?.value === "")
      error["department"] = "Department is required";
    else error["department"] = undefined;

    if (employeeNumberRef?.current?.value === "")
      error["number"] = "Number is required";
    else error["number"] = undefined;

    if (employeeEmailRef?.current?.value === "")
      error["email"] = "Email is required";
    else error["email"] = undefined;

    if (employeeAddress1Ref?.current?.value === "")
      error["address"] = "Address is required";
    else error["address"] = undefined;

    setEmployeeError(error);
  }

  // reset employee form & its error
  function clearEmployee() {
    if (employeeNameRef.current) employeeNameRef.current.value = "";
    if (employeeDepartmentRef.current) employeeDepartmentRef.current.value = "";
    if (employeeActiveRef.current) employeeActiveRef.current.checked = false;
    if (employeeNumberRef.current) employeeNumberRef.current.value = "";
    if (employeeEmailRef.current) employeeEmailRef.current.value = "";
    if (employeeAddress1Ref.current) employeeAddress1Ref.current.value = "";
    if (employeeAddress2Ref.current) employeeAddress2Ref.current.value = "";
    if (employeePhotoRef.current) employeePhotoRef.current.value = "";

    setEmployeePhoto(undefined);
    setEmployeeError(initialEmployeeError);
  }

  function createEmployee() {
    checkEmployee();

    setDidClickCreateEmployee(true);
  }

  // side effects from creating employee
  useEffect(() => {
    if (
      didClickCreateEmployee &&
      Object.values(employeeError).every((val) => val === undefined)
    ) {
      console.log("Employee created!");
    }

    setDidClickCreateEmployee(false);
  }, [didClickCreateEmployee, employeeError]);

  return (
    <div className="container-sm card mt-5">
      <div className="row p-4">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${employeeError.name && "is-invalid"}`}
              onFocus={() => validateEmployeeInput("name")}
              onChange={() => validateEmployeeInput("name")}
              ref={employeeNameRef}
            />
            {employeeError.name && (
              <div className="invalid-feedback">{employeeError.name}</div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Department</label>
            <select
              className={`form-select ${
                employeeError.department && "is-invalid"
              }`}
              onFocus={() => validateEmployeeInput("department")}
              onChange={() => validateEmployeeInput("department")}
              ref={employeeDepartmentRef}
            >
              <option hidden value="">
                Please select a department
              </option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Security">Security</option>
            </select>
            {employeeError.department && (
              <div className="invalid-feedback">{employeeError.department}</div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Status</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                ref={employeeActiveRef}
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
              className={`form-control ${employeeError.number && "is-invalid"}`}
              onFocus={() => validateEmployeeInput("number")}
              onChange={() => validateEmployeeInput("number")}
              ref={employeeNumberRef}
            />
            {employeeError.number && (
              <div className="invalid-feedback">{employeeError.number}</div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${employeeError.email && "is-invalid"}`}
              onFocus={() => validateEmployeeInput("email")}
              onChange={() => validateEmployeeInput("email")}
              ref={employeeEmailRef}
            />
            {employeeError.email && (
              <div className="invalid-feedback">{employeeError.email}</div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Address line 1</label>
            <input
              type="text"
              className={`form-control ${
                employeeError.address && "is-invalid"
              }`}
              onFocus={() => validateEmployeeInput("address")}
              onChange={() => validateEmployeeInput("address")}
              ref={employeeAddress1Ref}
            />
            {employeeError.address && (
              <div className="invalid-feedback">{employeeError.address}</div>
            )}
            <label className="form-label mt-2">Address line 2 (optional)</label>
            <input
              type="text"
              className="form-control"
              ref={employeeAddress2Ref}
            />
          </div>
        </div>
        {photo && (
          <div className="col-md-6">
            <div className="mb-3">Photo</div>
            <img
              src={URL.createObjectURL(photo)}
              className="img-thumbnail"
              alt="employee-image"
            ></img>
          </div>
        )}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(event) => handleEmployeePhoto(event)}
              ref={employeePhotoRef}
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
            onClick={createEmployee}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
