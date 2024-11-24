import { Entity, EntityRepositoryType, PrimaryKey, Property } from "@mikro-orm/core";
import { ProductRepository } from "src/repositories/product/product.repository";
import { config } from "src/commons/configs/config";

const schema = config.DB.SCHEMA;

@Entity({ tableName: "product", schema: schema, repository: () => ProductRepository })
export class ProductEntity {
  [EntityRepositoryType]?: ProductRepository;

  @PrimaryKey({ columnType: "bigserial", autoincrement: true, nullable: false, hidden: true })
  id!: number;

  @Property({ type: "varchar", length: 255, nullable: false, unique: true })
  codigo!: string; // Código único para evitar duplicados

  @Property({ type: "varchar", length: 255, nullable: false })
  nombre!: string; // Nombre del producto

  @Property({ type: "text", nullable: true })
  descripcion!: string; // Descripción del producto

  @Property({ type: "integer", nullable: false })
  cantidad!: number; // Cantidad en inventario

  @Property({ type: "numeric", nullable: false, precision: 10, scale: 2 })
  precioUnitario!: number; // Precio unitario del producto

  @Property({ type: "varchar", length: 255, nullable: false })
  categoria!: string; // Categoría a la que pertenece el producto
}
