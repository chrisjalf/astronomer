import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { EmployeeContextType } from "../types/index";

import { Employee } from "../types/index";
import api from "../api";
import { FetchEmployeesToast } from "../types/Employee";

export const EmployeeContext = createContext<EmployeeContextType>({
  employees: [],
  isFetchingEmployees: false,
  showFetchEmployeesToast: false,
  fetchEmployeesToast: undefined,
  selectedEmployee: undefined,
  createEmployee: () => {},
  selectEmployee: () => {},
  deleteEmployee: () => {},
  resetFetchEmployeesToast: () => {},
});

export function EmployeeContextProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isFetchingEmployees, setIsFetchingEmployees] = useState(false);
  const [showFetchEmployeesToast, setShowFetchEmployeesToast] = useState(false);
  const [fetchEmployeesToast, setFetchEmployeesToast] = useState<
    FetchEmployeesToast | undefined
  >(undefined);
  const [selectedEmployee, setSelectedEmployee] = useState<
    Employee | undefined
  >(undefined);

  // api call: get all employees
  async function getEmployees() {
    const { EmployeeService } = api;

    try {
      setIsFetchingEmployees(true);
      const emps: Employee[] = await EmployeeService.all();
      setIsFetchingEmployees(false);
      setEmployees(emps);
    } catch (error) {
      let message = "";
      if (error instanceof Error) message = error.message;
      else message = String(error);

      setIsFetchingEmployees(false);
      setShowFetchEmployeesToast(true);
      setFetchEmployeesToast({
        title: "Error",
        message,
      });
    }
  }

  useEffect(() => {
    getEmployees();
  }, []);

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

  function resetFetchEmployeesToast() {
    setShowFetchEmployeesToast(false);
    setFetchEmployeesToast(undefined);
  }

  const employeeCtx = {
    employees: employees,
    isFetchingEmployees: isFetchingEmployees,
    showFetchEmployeesToast: showFetchEmployeesToast,
    fetchEmployeesToast: fetchEmployeesToast,
    selectedEmployee: selectedEmployee,
    createEmployee: createEmployee,
    selectEmployee: selectEmployee,
    deleteEmployee: deleteEmployee,
    resetFetchEmployeesToast: resetFetchEmployeesToast,
  };

  return (
    <EmployeeContext.Provider value={employeeCtx}>
      {children}
    </EmployeeContext.Provider>
  );
}
