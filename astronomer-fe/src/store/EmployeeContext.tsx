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
  DeleteEmployeeToast,
  CreateEmployeeToast,
} from "../types/index";
import { createPortal } from "react-dom";
import { Toast, ToastContainer } from "react-bootstrap";

export const EmployeeContext = createContext<EmployeeContextType>({
  employees: [],

  isFetchingEmployees: false,

  selectedEmployee: undefined,

  createEmployee: () => {},
  selectEmployee: () => {},
  deleteEmployee: () => {},
});

export function EmployeeContextProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([]);

  // EmployeeList states
  const [isFetchingEmployees, setIsFetchingEmployees] = useState(false);
  const [showFetchEmployeesToast, setShowFetchEmployeesToast] = useState(false);
  const [fetchEmployeesToast, setFetchEmployeesToast] =
    useState<FetchEmployeesToast>({ title: "", message: "" });
  const [showDeleteEmployeeToast, setShowDeleteEmployeeToast] = useState(false);
  const [deleteEmployeeToast, setDeleteEmployeeToast] =
    useState<DeleteEmployeeToast>({ title: "", message: "" });

  // EmployeeForm states
  const [selectedEmployee, setSelectedEmployee] = useState<
    Employee | undefined
  >(undefined);
  const [showCreateEmployeeToast, setShowCreateEmployeeToast] = useState(false);
  const [createEmployeeToast, setCreateEmployeeToast] =
    useState<CreateEmployeeToast>({ title: "", message: "" });

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
      getEmployees();
    } catch (error) {
      let message = "";
      if (error instanceof Error) message = error.message;
      else message = String(error);

      setShowCreateEmployeeToast(true);
      setCreateEmployeeToast({
        title: "Error",
        message,
      });
    }
  },
  []);

  function selectEmployee(employee?: Employee) {
    setSelectedEmployee(employee);
  }

  const deleteEmployee = useCallback(async function deleteEmployee(id: string) {
    const { EmployeeService } = api;

    try {
      // delete employee api
      await EmployeeService.del(id);
      getEmployees();
    } catch (error) {
      let message = "";
      if (error instanceof Error) message = error.message;
      else message = String(error);

      setShowDeleteEmployeeToast(true);
      setDeleteEmployeeToast({
        title: "Error",
        message,
      });
    }
  }, []);

  function resetFetchEmployeesToast() {
    setShowFetchEmployeesToast(false);
    setFetchEmployeesToast({ title: "", message: "" });
  }

  function resetDeleteEmployeeToast() {
    setShowDeleteEmployeeToast(false);
    setDeleteEmployeeToast({ title: "", message: "" });
  }

  function resetCreateEmployeeToast() {
    setShowCreateEmployeeToast(false);
    setCreateEmployeeToast({ title: "", message: "" });
  }

  const employeeCtx = {
    employees: employees,

    isFetchingEmployees: isFetchingEmployees,

    selectedEmployee: selectedEmployee,
    showCreateEmployeeToast: showCreateEmployeeToast,
    createEmployeeToast: createEmployeeToast,

    createEmployee: createEmployee,
    selectEmployee: selectEmployee,
    deleteEmployee: deleteEmployee,
    resetCreateEmployeeToast: resetCreateEmployeeToast,
  };

  return (
    <EmployeeContext.Provider value={employeeCtx}>
      <>
        {/* Toast for failing to fetch employees */}
        {createPortal(
          <ToastContainer
            className="p-3"
            position={"top-end"}
            style={{ zIndex: 1 }}
          >
            <Toast
              show={showFetchEmployeesToast}
              onClose={resetFetchEmployeesToast}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">{fetchEmployeesToast.title}</strong>
              </Toast.Header>
              <Toast.Body>{fetchEmployeesToast.message}</Toast.Body>
            </Toast>
          </ToastContainer>,
          document.body
        )}
        {/* Toast for failing to delete employee */}
        {createPortal(
          <ToastContainer
            className="p-3"
            position={"top-end"}
            style={{ zIndex: 1 }}
          >
            <Toast
              show={showDeleteEmployeeToast}
              onClose={resetDeleteEmployeeToast}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">{deleteEmployeeToast.title}</strong>
              </Toast.Header>
              <Toast.Body>{deleteEmployeeToast.message}</Toast.Body>
            </Toast>
          </ToastContainer>,
          document.body
        )}
        {/* Toast for failing to create employee */}
        {createPortal(
          <ToastContainer
            className="p-3"
            position={"top-end"}
            style={{ zIndex: 1 }}
          >
            <Toast
              show={showCreateEmployeeToast}
              onClose={resetCreateEmployeeToast}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">{createEmployeeToast.title}</strong>
              </Toast.Header>
              <Toast.Body>{createEmployeeToast.message}</Toast.Body>
            </Toast>
          </ToastContainer>,
          document.body
        )}
        {children}
      </>
    </EmployeeContext.Provider>
  );
}
