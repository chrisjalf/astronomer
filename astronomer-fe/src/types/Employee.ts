export type EmployeeRequest = {
  name: string;
  department: string;
  status: "Active" | "Inactive";
  number: number;
  email: string;
  address1: string;
  address2?: string;
  photo?: string;
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

export type FetchEmployeesToast = {
  title: string;
  message: string;
};

export type EmployeeContextType = {
  employees: Employee[];

  isFetchingEmployees: boolean;
  showFetchEmployeesToast: boolean;
  fetchEmployeesToast?: FetchEmployeesToast;

  selectedEmployee?: Employee;

  createEmployee: (employee: EmployeeRequest) => void;
  selectEmployee: (employee?: Employee) => void;
  deleteEmployee: (id: string) => void;
  resetFetchEmployeesToast: () => void;
};
