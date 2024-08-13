import { createContext, ReactNode, useState } from "react";
import { EmployeeContextType } from "../types/index";

import { Employee } from "../types/index";

export const EmployeeContext = createContext<EmployeeContextType>({
  employees: [],
  selectedEmployee: undefined,
  createEmployee: () => {},
  selectEmployee: () => {},
  deleteEmployee: () => {},
});

export function EmployeeContextProvider({ children }: { children: ReactNode }) {
  const [dummyEmployees, setDummyEmployees] = useState<Employee[]>([
    {
      name: "Alibaba",
      department: "IT",
      status: "Active",
      number: 1123398609,
      email: "chris.w4ac@gmail.com",
      address1: "24-5 Residensi Vivo",
    },
  ]);
  const [selectedEmployee, setSelectedEmployee] = useState<
    Employee | undefined
  >(undefined);

  function createEmployee(newEmployee: Employee) {
    setDummyEmployees((prevEmployees) => {
      return [...prevEmployees, newEmployee];
    });
    setSelectedEmployee(undefined);
  }

  function selectEmployee(employee?: Employee) {
    setSelectedEmployee(employee);
  }

  function deleteEmployee(employee: Employee) {
    setDummyEmployees((prevEmployees) => {
      return [...prevEmployees.filter((emp) => emp.name !== employee.name)];
    });
  }

  const employeeCtx = {
    employees: dummyEmployees,
    selectedEmployee: selectedEmployee,
    createEmployee: (employee: Employee) => createEmployee(employee),
    selectEmployee: (employee?: Employee) => selectEmployee(employee),
    deleteEmployee: (employee: Employee) => deleteEmployee(employee),
  };

  return (
    <EmployeeContext.Provider value={employeeCtx}>
      {children}
    </EmployeeContext.Provider>
  );
}
