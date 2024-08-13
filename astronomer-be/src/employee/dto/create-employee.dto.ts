import { IsEmail, IsIn, IsNotEmpty } from "class-validator";

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  department: string;

  @IsNotEmpty()
  @IsIn(["Active", "Inactive"])
  status: string;

  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  address1: string;

  address2: string;
}
