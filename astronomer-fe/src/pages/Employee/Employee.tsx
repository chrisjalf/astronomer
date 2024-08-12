import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import { EmployeeContext } from "../../store/EmployeeContext";

export default function Employee() {
  return (
    <EmployeeContext.Provider value={{ employees: [] }}>
      <EmployeeForm />
      <EmployeeList />
    </EmployeeContext.Provider>
  );
}
