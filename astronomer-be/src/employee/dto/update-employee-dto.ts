import { IsEmail, IsIn, IsNotEmpty, Matches } from "class-validator";

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
  @Matches(/^0*[0-9]{10,11}$/, {
    message: "number must be 10-11 of numeric characters",
  })
  number: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  address1: string;

  address2: string;
}
