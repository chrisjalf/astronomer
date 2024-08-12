export type EmployeePartial = {
  name: string;
  department: string;
  status: string;
};

export type EmployeeFull = {
  name: string,
  department: string;
  status: string;
  number: number;
  email: string;
  address1: string;
  address2?: string;
  photo?: string;
}

export type EmployeeContextType = {
  employees: EmployeePartial[];
};
