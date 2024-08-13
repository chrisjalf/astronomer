import { Inject, Injectable } from "@nestjs/common";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { CreateEmployeeDto } from "./dto/create-employee.dto";

@Injectable()
export class EmployeeService {
  private cacheTTLInMs = 86400 * 1000; // 24 hours

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async findAll() {
    return (await this.cacheManager.get("employees")) ?? [];
  }

  async create(dto: CreateEmployeeDto) {
    let employees: CreateEmployeeDto[] =
      (await this.cacheManager.get("employees")) ?? [];

    if (employees.length > 0) employees.push(dto);
    else employees = [dto];

    await this.cacheManager.set("employees", employees, this.cacheTTLInMs);
    return {};
  }
}
