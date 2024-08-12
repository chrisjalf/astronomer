import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";

import { EmployeeContextProvider } from "../../store/index";

export default function Employee() {
  return (
    <EmployeeContextProvider>
      <EmployeeForm />
      <EmployeeList />
    </EmployeeContextProvider>
  );
}
