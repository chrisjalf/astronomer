export type Employee = {
  name: string;
  department: string;
  status: "Active" | "Inactive";
  number: number;
  email: string;
  address1: string;
  address2?: string;
  photo?: string;
};

export type EmployeeContextType = {
  employees: Employee[];
  selectedEmployee?: Employee;
  setEmployees: (employees: Employee[]) => void;
  createEmployee: (employee: Employee) => void;
  selectEmployee: (employee?: Employee) => void;
  deleteEmployee: (employee: Employee) => void;
};
