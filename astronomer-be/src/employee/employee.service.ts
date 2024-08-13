import { Injectable } from "@nestjs/common";

@Injectable()
export class EmployeeService {
  async findAll() {
    return [
      {
        id: new Date().toString(),
        name: "Alibaba",
        department: "IT",
        status: "Active",
        number: 1123398609,
        email: "chris.w4ac@gmail.com",
        address1: "24-5 Residensi Vivo",
      },
    ];
  }
}
