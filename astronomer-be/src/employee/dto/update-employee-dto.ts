import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";

export default class UpdateEmployeeDto {
  @IsNotEmpty()
  id: string;

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
