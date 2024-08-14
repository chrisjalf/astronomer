import { EmployeeRequest, UpdateEmployeeRequest } from "../types/Employee";

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
  const formData = new FormData();

  formData.append("name", employee.name);
  formData.append("department", employee.department);
  formData.append("status", employee.status);
  formData.append("number", `${employee.number}`);
  formData.append("email", employee.email);
  formData.append("address1", employee.address1);
  if (employee.address2) formData.append("address2", employee.address2);
  if (employee.photo) formData.append("photo", employee.photo);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to create employee");
};

export const update = async (employee: UpdateEmployeeRequest) => {
  const url = `${apiBaseUrl}/${service}/update`;
  const formData = new FormData();

  formData.append("id", employee.id);
  formData.append("name", employee.name);
  formData.append("department", employee.department);
  formData.append("status", employee.status);
  formData.append("number", `${employee.number}`);
  formData.append("email", employee.email);
  formData.append("address1", employee.address1);
  if (employee.address2) formData.append("address2", employee.address2);
  if (employee.photo) formData.append("photo", employee.photo);

  const response = await fetch(url, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to update employee");
};

export const del = async (id: string) => {
  const url = `${apiBaseUrl}/${service}/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed to delete employee");
};
