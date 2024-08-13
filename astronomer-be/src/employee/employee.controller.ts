import { Controller, Get, HttpCode } from "@nestjs/common";
import { EmployeeService } from "./employee.service";

@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get("all")
  @HttpCode(200)
  async allEmployees() {
    return this.employeeService.findAll();
  }
}
