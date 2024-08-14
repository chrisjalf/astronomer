import { EmployeeRequest } from "../types/Employee";

const apiBaseUrl = "http://localhost:3000";
const service = "employee";

export const all = async () => {
  const url = `${apiBaseUrl}/${service}/all`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) throw new Error("Failed to fetch all employees");
  else return data;
};

export const create = async (employee: EmployeeRequest) => {
  const url = `${apiBaseUrl}/${service}/create`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) throw new Error("Failed to create employee");
  else return;
};
