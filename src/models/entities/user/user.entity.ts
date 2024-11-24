import { Entity, EntityRepositoryType, PrimaryKey, Property } from "@mikro-orm/core";
import { config } from "src/commons/configs/config";
import { UserRepository } from "src/repositories/user/user.repository";

const schema = config.DB.SCHEMA;
@Entity({ tableName: "user", schema: schema, repository: () => UserRepository })
export class UserEntity {
  @PrimaryKey({ columnType: "bigserial", autoincrement: true, nullable: false, hidden: true })
  id!: number; // Identificador único para cada usuario

  @Property({ type: "varchar", length: 255, nullable: false, unique: true })
  username!: string; // Nombre de usuario único para el registro

  @Property({ type: "varchar", length: 255, nullable: false })
  password!: string; // Contraseña del usuario (debería almacenarse en formato cifrado)

  @Property({ type: "varchar", length: 255, nullable: true })
  email?: string; // Correo electrónico opcional
}
