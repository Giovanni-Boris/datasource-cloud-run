import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { MikroORM, UnderscoreNamingStrategy } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { config } from "../configs/config";

@Module({
  imports: [
    MikroOrmModule.forRoot({
      autoLoadEntities: true,
      host: process.env.DB_HOST,
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: Number(process.env.DB_PORT) ?? 8080,
      schema: process.env.DB_SCHEMA,
      driver: PostgreSqlDriver,
      ensureDatabase: true,
      charset: "utf8",
      collate: "es_CL.utf8",
      forceUtcTimezone: true,
      implicitTransactions: true,
      namingStrategy: UnderscoreNamingStrategy,
      pool: {
        min: Number(process.env.DB_POOL_MIN) ?? 10,
        max: Number(process.env.DB_POOL_MAX) ?? 100,
        acquireTimeoutMillis: Number(process.env.DB_POOL_ACQUIRE_TIMEOUT) ?? 5000,
      },
      discovery: {
        checkDuplicateTableNames: true,
        checkDuplicateEntities: true,
      },
      /*resultCache: {
        adapter: MemoryCacheAdapter,
        expiration: 60 * 360 * 1000,
        global: true
      },*/
      debug: process.env.DB_DEBUG === "true",
    }),
  ],
})
export class DatabaseConfigModule implements OnModuleInit {
  private readonly logger = new Logger(DatabaseConfigModule.name);

  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    const updateSchema: boolean = config.DB.UPDATE_SCHEMA === "true";

    if (updateSchema) {
      try {
        const generator = this.orm.getSchemaGenerator();
        await generator.ensureDatabase();
        await this.runSqlFiles();
      } catch (e) {
        this.logger.error(`DATABASE INITIALIZATION ERROR ${e.message}`);
      }
    }
  }

  private async runSqlFiles(): Promise<void> {
    const schema = config.DB.UPDATE_SCHEMA;
    const connection = this.orm.em.getConnection();
    const scriptsPath = join(process.cwd(), "scripts");
    const files = readdirSync(scriptsPath)
      .filter((file) => file.endsWith(".sql"))
      .sort((a, b) => a.localeCompare(b));

    for (const file of files) {
      const filePath = join(scriptsPath, file);
      let sql = readFileSync(filePath, "utf-8");
      sql = this.prependSchema(sql, schema);
      const em = this.orm.em.fork();
      try {
        await em.begin();
        await connection.execute(sql);
        await em.commit();
        this.logger.log(`Executed script: ${file}`);
      } catch (e) {
        await em.rollback();
        this.logger.error(`Error executing script: ${file} - ${e.message}`);
        throw e;
      }
    }
  }

  private prependSchema(sql: string, schema: string): string {
    return `SET search_path TO ${schema};\n${sql}`;
  }
}
