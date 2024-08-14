import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import { EmployeeService } from "./employee.service";
import CreateEmployeeDto from "./dto/create-employee.dto";

@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get("all")
  @HttpCode(200)
  async allEmployees() {
    return this.employeeService.findAll();
  }

  @Post("create")
  @HttpCode(200)
  @UseInterceptors(FileInterceptor("photo"))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateEmployeeDto
  ) {
    return this.employeeService.create(dto, file);
  }

  @Delete(":id")
  @HttpCode(200)
  async delete(@Param("id") id: string) {
    return this.employeeService.delete(id);
  }
}
