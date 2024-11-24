import { Injectable } from "@nestjs/common";
import { UserDto } from "src/models/dtos/user/requests/user-dto.model";
import { LoginUserDto } from "src/models/dtos/user/requests/user-login-dto.model";
import { UserEntity } from "src/models/entities/user/user.entity";
import { ListResponseDto } from "src/models/responses/list-response.dto";
import { UserRepository } from "src/repositories/user/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  saveUser(user: UserDto): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  getUsers(): Promise<ListResponseDto<UserEntity>> {
    return this.userRepository.getUsers();
  }

  loginUser(userDto: LoginUserDto): Promise<UserEntity> {
    return this.userRepository.loginUser(userDto);
  }
}
