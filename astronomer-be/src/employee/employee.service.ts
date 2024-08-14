import { Inject, Injectable } from "@nestjs/common";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { v4 as uuid } from "uuid";
import * as path from "path";
import * as fs from "fs";
import EmployeeDto from "./dto/employee.dto";
import CreateEmployeeDto from "./dto/create-employee.dto";
import UpdateEmployeeDto from "./dto/update-employee-dto";

@Injectable()
export class EmployeeService {
  private cacheTTLInMs = 86400 * 1000; // 24 hours

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async findAll() {
    return (await this.cacheManager.get("employees")) ?? [];
  }

  async create(dto: CreateEmployeeDto, file: Express.Multer.File) {
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

    if (file) {
      const uploadDir = path.join(__dirname, "..", "uploads");
      const fileExtArray = file.mimetype.split("/");
      const fileExtension = fileExtArray[fileExtArray.length - 1];
      const fileName = `${formattedDto.id}-photo.${fileExtension}`;
      const filePath = path.join(uploadDir, fileName);

      // ensure the uploads directory exists
      await fs.promises.mkdir(uploadDir, { recursive: true });

      // write the file to the uploads directory
      await fs.promises.writeFile(filePath, file.buffer);

      const baseUrl = "http://localhost:3000";
      formattedDto.photo = `${baseUrl}/uploads/${fileName}`;
    }

    let employees: EmployeeDto[] =
      (await this.cacheManager.get("employees")) ?? [];

    if (employees.length > 0) employees.push(formattedDto);
    else employees = [formattedDto];

    this.cacheManager.set("employees", employees, this.cacheTTLInMs);
    return {};
  }

  async update(dto: UpdateEmployeeDto, file: Express.Multer.File) {
    const employees: EmployeeDto[] =
      (await this.cacheManager.get("employees")) ?? [];
    const employee = employees.find((employee) => employee.id === dto.id);

    if (employee) {
      const updatedEmployee = new EmployeeDto(
        dto.id,
        dto.name,
        dto.department,
        dto.status,
        dto.number,
        dto.email,
        dto.address1,
        dto.address2
      );

      if (file) {
        const uploadDir = path.join(__dirname, "..", "uploads");
        const fileExtArray = file.mimetype.split("/");
        const fileExtension = fileExtArray[fileExtArray.length - 1];
        const fileName = `${updatedEmployee.id}-photo.${fileExtension}`;
        const filePath = path.join(uploadDir, fileName);

        // ensure the uploads directory exists
        await fs.promises.mkdir(uploadDir, { recursive: true });

        // write the file to the uploads directory
        await fs.promises.writeFile(filePath, file.buffer);

        const baseUrl = "http://localhost:3000";
        updatedEmployee.photo = `${baseUrl}/uploads/${fileName}`;
      }

      const updatedEmployees = employees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      );

      this.cacheManager.set("employees", updatedEmployees, this.cacheTTLInMs);
      return {};
    }
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
