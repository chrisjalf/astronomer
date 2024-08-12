import { createContext } from "react";
import { EmployeeContextType } from "../assets/types/Employee";

export const EmployeeContext = createContext<EmployeeContextType>({
  employees: [],
});
