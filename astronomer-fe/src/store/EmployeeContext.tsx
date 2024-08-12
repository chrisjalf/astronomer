import { createContext } from "react";
import { EmployeeContextType } from "../types/index";

export const EmployeeContext = createContext<EmployeeContextType>({
  employees: [],
  createEmployee: () => {},
});
