import { createContext, ReactNode, useCallback, useState } from "react";
import { EmployeeContextType } from "../types/index";

import { Employee } from "../types/index";

export const EmployeeContext = createContext<EmployeeContextType>({
  employees: [],
  selectedEmployee: undefined,
  setEmployees: () => {},
  createEmployee: () => {},
  selectEmployee: () => {},
  deleteEmployee: () => {},
});

export function EmployeeContextProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<
    Employee | undefined
  >(undefined);

  const handleSetEmployees = useCallback(function handleSetEmployees(
    employees: Employee[]
  ) {
    setEmployees(employees);
  },
  []);

  const createEmployee = useCallback(function createEmployee(
    newEmployee: Employee
  ) {
    setEmployees((prevEmployees) => {
      return [...prevEmployees, newEmployee];
    });
    setSelectedEmployee(undefined);
  },
  []);

  function selectEmployee(employee?: Employee) {
    setSelectedEmployee(employee);
  }

  function deleteEmployee(employee: Employee) {
    setEmployees((prevEmployees) => {
      return [...prevEmployees.filter((emp) => emp.name !== employee.name)];
    });
  }

  const employeeCtx = {
    employees: employees,
    selectedEmployee: selectedEmployee,
    setEmployees: handleSetEmployees,
    createEmployee: createEmployee,
    selectEmployee: selectEmployee,
    deleteEmployee: deleteEmployee,
  };

  return (
    <EmployeeContext.Provider value={employeeCtx}>
      {children}
    </EmployeeContext.Provider>
  );
}
