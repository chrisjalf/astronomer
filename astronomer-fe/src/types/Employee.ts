export type EmployeeRequest = {
  name: string;
  department: string;
  status: "Active" | "Inactive";
  number: number;
  email: string;
  address1: string;
  address2?: string;
  photo?: File;
};

export type UpdateEmployeeRequest = {
  id: string;
  name: string;
  department: string;
  status: "Active" | "Inactive";
  number: number;
  email: string;
  address1: string;
  address2?: string;
  photo?: File;
};

export type Employee = {
  id: string;
  name: string;
  department: string;
  status: "Active" | "Inactive";
  number: number;
  email: string;
  address1: string;
  address2?: string;
  photo?: string;
};

export type EmployeeToast = {
  title: string;
  message: string;
};

export type FetchEmployeesToast = EmployeeToast;

export type DeleteEmployeeToast = EmployeeToast;

export type EditEmployeeToast = EmployeeToast;

export type CreateEmployeeToast = EmployeeToast;

export type EmployeeContextType = {
  employees: Employee[];

  isFetchingEmployees: boolean;

  selectedEmployee?: Employee;

  createEmployee: (employee: EmployeeRequest) => void;
  selectEmployee: (employee?: Employee) => void;
  editEmployee: (employee: UpdateEmployeeRequest) => void;
  deleteEmployee: (id: string) => void;
};
