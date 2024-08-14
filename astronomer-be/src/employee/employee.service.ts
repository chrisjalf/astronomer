import { Inject, Injectable } from "@nestjs/common";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { v4 as uuid } from "uuid";
import EmployeeDto from "./dto/employee.dto";
import CreateEmployeeDto from "./dto/create-employee.dto";

@Injectable()
export class EmployeeService {
  private cacheTTLInMs = 86400 * 1000; // 24 hours

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async findAll() {
    return (await this.cacheManager.get("employees")) ?? [];
  }

  async create(dto: CreateEmployeeDto) {
    const formattedDto = new EmployeeDto(
      uuid(),
      dto.name,
      dto.department,
      dto.status,
      dto.number,
      dto.email,
      dto.address1,
      dto.address2
    );

    let employees: EmployeeDto[] =
      (await this.cacheManager.get("employees")) ?? [];

    if (employees.length > 0) employees.push(formattedDto);
    else employees = [formattedDto];

    this.cacheManager.set("employees", employees, this.cacheTTLInMs);
    return {};
  }

  async delete(id: string) {
    const employees: EmployeeDto[] =
      (await this.cacheManager.get("employees")) ?? [];
    const remainingEmployees = employees.filter(
      (employee) => employee.id !== id
    );

    this.cacheManager.set("employees", remainingEmployees, this.cacheTTLInMs);
    return {};
  }
}
