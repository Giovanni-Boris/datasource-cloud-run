import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { UserEntity } from "src/models/entities/user/user.entity";
import { UserService } from "src/services/user.service";
import { UserController } from "src/controllers/user.controller";

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [UserEntity] })],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
