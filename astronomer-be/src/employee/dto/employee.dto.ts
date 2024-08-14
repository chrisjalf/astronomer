export default class EmployeeDto {
  id: string;
  name: string;
  department: string;
  status: string;
  number: string;
  email: string;
  address1: string;
  address2?: string;
  photo?: string;

  constructor(
    id: string,
    name: string,
    department: string,
    status: string,
    number: string,
    email: string,
    address1: string,
    address2?: string
  ) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.status = status;
    this.number = number;
    this.email = email;
    this.address1 = address1;
    this.address2 = address2;
  }
}
