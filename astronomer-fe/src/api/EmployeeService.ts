const apiBaseUrl = "http://localhost:3000";
const service = "employee";

export const all = async () => {
  const url = `${apiBaseUrl}/${service}/all`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) throw new Error("Failed to fetch all employees");
  else return data;
};
