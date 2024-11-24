import { IsString } from "class-validator";
import { BaseDto } from "../../base-dto.model";

export class LoginUserDto extends BaseDto {
  @IsString()
  username!: string;

  @IsString()
  password!: string;
}
