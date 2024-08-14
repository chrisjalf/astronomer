import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import api from "../api";
import {
  EmployeeContextType,
  Employee,
  EmployeeRequest,
  FetchEmployeesToast,
} from "../types/index";

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

  // EmployeeList states
  const [isFetchingEmployees, setIsFetchingEmployees] = useState(false);
  const [showFetchEmployeesToast, setShowFetchEmployeesToast] = useState(false);
  const [fetchEmployeesToast, setFetchEmployeesToast] = useState<
    FetchEmployeesToast | undefined
  >(undefined);

  // EmployeeForm states
  const [selectedEmployee, setSelectedEmployee] = useState<
    Employee | undefined
  >(undefined);

  useEffect(() => {
    getEmployees();
  }, []);

  // get all employees api
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

  const createEmployee = useCallback(async function createEmployee(
    employee: EmployeeRequest
  ) {
    const { EmployeeService } = api;

    try {
      // create employee api
      await EmployeeService.create(employee);
      await getEmployees();
    } catch (error) {
      let message = "";
      if (error instanceof Error) message = error.message;
      else message = String(error);

      console.log(message);
    }
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
