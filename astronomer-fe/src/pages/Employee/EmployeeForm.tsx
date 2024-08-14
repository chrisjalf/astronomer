import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

import { validateEmail, validateNumber } from "../../util";
import { EmployeeContext } from "../../store/index";
import { EmployeeFormError } from "../../types/index";
import { EmployeeRequest, UpdateEmployeeRequest } from "../../types/Employee";

const initialEmployeeError: EmployeeFormError = {
  name: undefined,
  department: undefined,
  number: undefined,
  email: undefined,
  address: undefined,
};

export default function EmployeeForm() {
  // employee form fields
  const employeeNameRef = useRef<HTMLInputElement>(null);
  const employeeDepartmentRef = useRef<HTMLSelectElement>(null);
  const employeeActiveRef = useRef<HTMLInputElement>(null);
  const employeeNumberRef = useRef<HTMLInputElement>(null);
  const employeeEmailRef = useRef<HTMLInputElement>(null);
  const employeeAddress1Ref = useRef<HTMLInputElement>(null);
  const employeeAddress2Ref = useRef<HTMLInputElement>(null);
  const employeePhotoRef = useRef<HTMLInputElement>(null);
  const [photo, setEmployeePhoto] = useState<string | undefined>(undefined);

  // employee form error
  const [employeeError, setEmployeeError] = useState(initialEmployeeError);

  // misc
  const [didClickCreateEmployee, setDidClickCreateEmployee] = useState(false);
  const [didClickEditEmployee, setDidClickEditEmployee] = useState(false);

  function handleEmployeePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file =
      event.target.files && event.target.files.length > 0
        ? event.target.files[0]
        : undefined;

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // convert the file to a base64 string and set it to state
        setEmployeePhoto(reader.result as string);
      };

      reader.readAsDataURL(file); // read the file as a data URL
    }
  }

  // context
  const { selectedEmployee, createEmployee, selectEmployee, editEmployee } =
    useContext(EmployeeContext);

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
        const employeeNumber = employeeNumberRef?.current?.value ?? "";
        if (employeeNumber === "") errorMessage = "Number is required";
        else if (!validateNumber(employeeNumber))
          errorMessage =
            "Number is invalid, must be 10-11 of numeric characters";
        else errorMessage = undefined;

        break;
      }
      case "email": {
        const email = employeeEmailRef?.current?.value ?? "";
        if (email === "") errorMessage = "Email is required";
        else if (!validateEmail(email)) errorMessage = "Email is invalid";
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

    const employeeNumber = employeeNumberRef?.current?.value ?? "";
    if (employeeNumber === "") error["number"] = "Number is required";
    else if (!validateNumber(employeeNumber))
      error["number"] =
        "Number is invalid, must be 10-11 of numeric characters";
    else error["number"] = undefined;

    const email = employeeEmailRef?.current?.value ?? "";
    if (email === "") error["email"] = "Email is required";
    else if (!validateEmail(email)) error["email"] = "Email is invalid";
    else error["email"] = undefined;

    if (employeeAddress1Ref?.current?.value === "")
      error["address"] = "Address is required";
    else error["address"] = undefined;

    setEmployeeError(error);
  }

  // reset employee form & its error
  function clearEmployee() {
    clearEmployeeFields();

    setEmployeePhoto(undefined);
    setEmployeeError(initialEmployeeError);

    if (selectedEmployee !== undefined) selectEmployee(undefined);
  }

  function clearEmployeeFields() {
    if (employeeNameRef.current) employeeNameRef.current.value = "";
    if (employeeNameRef.current) employeeNameRef.current.value = "";
    if (employeeDepartmentRef.current) employeeDepartmentRef.current.value = "";
    if (employeeActiveRef.current) employeeActiveRef.current.checked = false;
    if (employeeNumberRef.current) employeeNumberRef.current.value = "";
    if (employeeEmailRef.current) employeeEmailRef.current.value = "";
    if (employeeAddress1Ref.current) employeeAddress1Ref.current.value = "";
    if (employeeAddress2Ref.current) employeeAddress2Ref.current.value = "";
    if (employeePhotoRef.current) employeePhotoRef.current.value = "";
  }

  function handleCreateEmployee() {
    checkEmployee();

    setDidClickCreateEmployee(true);
  }

  function handleEditEmployee() {
    checkEmployee();

    setDidClickEditEmployee(true);
  }

  // side effects from creating employee
  useEffect(() => {
    if (
      didClickCreateEmployee &&
      Object.values(employeeError).every((val) => val === undefined)
    ) {
      const employee: EmployeeRequest = {
        name: employeeNameRef.current!.value,
        department: employeeDepartmentRef.current!.value,
        status:
          employeeActiveRef.current!.checked === true ? "Active" : "Inactive",
        number: Number(employeeNumberRef.current!.value),
        email: employeeEmailRef.current!.value,
        address1: employeeAddress1Ref.current!.value,
        address2: employeeAddress2Ref.current?.value,
        photo: employeePhotoRef.current?.files
          ? employeePhotoRef.current?.files[0]
          : undefined,
      };
      createEmployee(employee);
    }

    if (didClickCreateEmployee) setDidClickCreateEmployee(false);
  }, [didClickCreateEmployee, employeeError, createEmployee]);

  // side effects after creating employee
  useEffect(() => {
    if (didClickCreateEmployee) {
      clearEmployeeFields();
      setEmployeePhoto(undefined);
    }
  }, [didClickCreateEmployee]);

  // side effects after (selecting an employee for edit) / (clearing form)
  useEffect(() => {
    if (selectedEmployee !== undefined) {
      if (employeeNameRef.current)
        employeeNameRef.current.value = selectedEmployee.name;

      if (employeeDepartmentRef.current)
        employeeDepartmentRef.current.value = selectedEmployee.department;

      if (employeeActiveRef.current)
        employeeActiveRef.current.checked =
          selectedEmployee.status === "Active";

      if (employeeNumberRef.current)
        employeeNumberRef.current.value = `${selectedEmployee.number}`;

      if (employeeEmailRef.current)
        employeeEmailRef.current.value = selectedEmployee.email;

      if (employeeAddress1Ref.current)
        employeeAddress1Ref.current.value = selectedEmployee.address1;

      if (employeeAddress2Ref.current)
        employeeAddress2Ref.current.value = selectedEmployee.address2 ?? "";

      if (employeePhotoRef.current) employeePhotoRef.current.value = "";

      setEmployeePhoto(selectedEmployee.photo);
    } else {
      clearEmployeeFields();
      setEmployeePhoto(undefined);
    }
  }, [selectedEmployee]);

  // side effects when selecting employee for edit but form contains error
  useEffect(() => {
    if (selectedEmployee !== undefined) setEmployeeError(initialEmployeeError);
  }, [selectedEmployee, employeeError]);

  // side effects from editing employee
  useEffect(() => {
    if (
      didClickEditEmployee &&
      Object.values(employeeError).every((val) => val === undefined)
    ) {
      const employee: UpdateEmployeeRequest = {
        id: selectedEmployee!.id,
        name: employeeNameRef.current!.value,
        department: employeeDepartmentRef.current!.value,
        status:
          employeeActiveRef.current!.checked === true ? "Active" : "Inactive",
        number: Number(employeeNumberRef.current!.value),
        email: employeeEmailRef.current!.value,
        address1: employeeAddress1Ref.current!.value,
        address2: employeeAddress2Ref.current?.value,
        photo: employeePhotoRef.current?.files
          ? employeePhotoRef.current?.files[0]
          : undefined,
      };
      editEmployee(employee);
    }

    if (didClickEditEmployee) setDidClickEditEmployee(false);
  }, [didClickEditEmployee, employeeError, selectedEmployee, editEmployee]);

  // side effects after editing employee
  useEffect(() => {
    if (didClickEditEmployee) {
      clearEmployeeFields();
      setEmployeePhoto(undefined);
    }
  }, [didClickEditEmployee]);

  return (
    <div className="container-sm card mt-5">
      <div className="row px-4 pt-4">
        <h3>
          {selectedEmployee === undefined
            ? "Create Employee"
            : `Edit Employee (${selectedEmployee.name})`}
        </h3>
      </div>
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
              type="text"
              className={`form-control ${employeeError.number && "is-invalid"}`}
              onFocus={() => validateEmployeeInput("number")}
              onChange={() => validateEmployeeInput("number")}
              ref={employeeNumberRef}
              maxLength={11}
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
              src={photo}
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
            onClick={
              selectedEmployee === undefined
                ? handleCreateEmployee
                : handleEditEmployee
            }
          >
            {selectedEmployee === undefined ? "Create" : `Edit`}
          </button>
        </div>
      </div>
    </div>
  );
}
