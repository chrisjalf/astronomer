import { createContext, ReactNode, useState } from "react";
import { EmployeeContextType } from "../types/index";

import { Employee } from "../types/index";

export const EmployeeContext = createContext<EmployeeContextType>({
  employees: [],
  selectedEmployee: undefined,
  createEmployee: () => {},
  selectEmployee: () => {},
});

export default function EmployeeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
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
  }

  function selectEmployee(employee?: Employee) {
    setSelectedEmployee(employee);
  }

  const employeeCtx = {
    employees: dummyEmployees,
    selectedEmployee: selectedEmployee,
    createEmployee: (employee: Employee) => createEmployee(employee),
    selectEmployee: (employee?: Employee) => selectEmployee(employee),
  };

  return (
    <EmployeeContext.Provider value={employeeCtx}>
      {children}
    </EmployeeContext.Provider>
  );
}
