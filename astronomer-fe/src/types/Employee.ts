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
  createEmployee: (employee: Employee) => void;
  selectEmployee: (employee?: Employee) => void;
};
