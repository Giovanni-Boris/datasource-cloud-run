import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { BaseDto } from "../../base-dto.model";

export class UserDto extends BaseDto {
  @IsString()
  username!: string;

  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  password!: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
