import { Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { BaseRepository } from "../base.repository";
import { ErrorHandler } from "src/commons/utils/handle-errors";
import { UserEntity } from "src/models/entities/user/user.entity";
import { UserDto } from "src/models/dtos/user/requests/user-dto.model";
import * as bcrypt from "bcrypt";
import { ListResponseDto } from "src/models/responses/list-response.dto";
import { LoginUserDto } from "src/models/dtos/user/requests/user-login-dto.model";

export class UserRepository extends BaseRepository<UserEntity> {
  readonly logger = new Logger(UserRepository.name);

  async save(userDto: UserDto): Promise<UserEntity> {
    return this.em
      .transactional(async () => {
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        const user = this.create({
          ...userDto,
          password: hashedPassword,
        });
        await this.em.persist(user).flush();
        return user;
      })
      .catch((err) => {
        this.logger.error(`Error save user: ${err.message}`);
        ErrorHandler.handleError(err, "user");
      });
  }
  async getUsers(): Promise<ListResponseDto<UserEntity>> {
    const result = await this.find({}).catch((err) => {
      this.logger.error(`Error get users: ${err.message}`);
      return [];
    });
    return new ListResponseDto<UserEntity>(result);
  }

  async loginUser(userDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.em.findOne(UserEntity, { username: userDto.username });

    if (!user) throw new NotFoundException("User Not Found");

    const isPasswordValid = await bcrypt.compare(userDto.password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException("Invalid password");

    return user;
  }
}
