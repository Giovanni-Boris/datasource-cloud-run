import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ProductService } from "src/services/product.service";
import { ProductController } from "src/controllers/product.controller";
import { ProductEntity } from "src/models/entities/product/product.entity";

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [ProductEntity] })],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
