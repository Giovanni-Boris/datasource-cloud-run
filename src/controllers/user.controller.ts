import { Body, Controller, Post, Get } from "@nestjs/common";
import { UserEntity } from "src/models/entities/user/user.entity";
import { ListResponseDto } from "src/models/responses/list-response.dto";
import { UserService } from "src/services/user.service";
import { UserDto } from "src/models/dtos/user/requests/user-dto.model";
import { LoginUserDto } from "src/models/dtos/user/requests/user-login-dto.model";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  saveUser(@Body() user: UserDto): Promise<UserEntity> {
    return this.userService.saveUser(user);
  }

  @Get()
  getUsers(): Promise<ListResponseDto<UserEntity>> {
    return this.userService.getUsers();
  }
  @Post("/login")
  loginUser(@Body() userDto: LoginUserDto): Promise<UserEntity> {
    return this.userService.loginUser(userDto);
  }
}
