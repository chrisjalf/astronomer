import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import { EmployeeContext } from "../../store/EmployeeContext";

export default function Employee() {
  const dummyEmployees = [
    { name: "Alibaba", department: "IT", status: "Active" },
    { name: "Boost", department: "Finance", status: "Active" },
    { name: "WTE", department: "Marketing", status: "Inactive" },
  ];

  return (
    <EmployeeContext.Provider value={{ employees: dummyEmployees }}>
      <EmployeeForm />
      <EmployeeList />
    </EmployeeContext.Provider>
  );
}
