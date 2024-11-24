import { EntityManager, EntityRepository } from "@mikro-orm/postgresql";
import { Logger } from "@nestjs/common";

export class BaseRepository<T extends object> extends EntityRepository<T> {
  protected logger = new Logger(BaseRepository.name);
  protected schema = process.env.DB_SCHEMA;

  constructor(
    protected readonly em: EntityManager,
    entity: new () => T
  ) {
    super(em, entity);
  }
}
