import { useState } from "react";

import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import { EmployeeFull, EmployeePartial } from "../../types/index";
import { EmployeeContext } from "../../store/index";

export default function Employee() {
  const [dummyEmployees, setDummyEmployees] = useState<EmployeePartial[]>([
    { name: "Alibaba", department: "IT", status: "Active" },
    { name: "Boost", department: "Finance", status: "Active" },
    { name: "WTE", department: "Marketing", status: "Inactive" },
  ]);

  function updateEmployeeList(newEmployee: EmployeePartial) {
    setDummyEmployees((prevEmployees) => {
      return [...prevEmployees, newEmployee];
    });
  }

  function createEmployee(employee: EmployeeFull) {
    const employeePartial: EmployeePartial = {
      name: employee.name,
      department: employee.department,
      status: employee.status,
    };
    updateEmployeeList(employeePartial);
  }

  const employeeCtx = {
    employees: dummyEmployees,
    createEmployee: (employee: EmployeeFull) => createEmployee(employee),
  };

  return (
    <EmployeeContext.Provider value={employeeCtx}>
      <EmployeeForm />
      <EmployeeList />
    </EmployeeContext.Provider>
  );
}
