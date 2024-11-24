import { Module } from "@nestjs/common";
import { ProductModule } from "./database/product.module";
import { UserModule } from "./database/user.module";

@Module({
  imports: [ProductModule, UserModule],
})
export class EntitiesModule {}
