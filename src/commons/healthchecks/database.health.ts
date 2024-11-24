import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";

@Injectable()
export class DatabaseHealth extends HealthIndicator {
  constructor(private readonly em: EntityManager) {
    super();
  }

  async pingCheck(key: string): Promise<HealthIndicatorResult> {
    try {
      const connection = this.em.getConnection();
      if (await connection.isConnected()) {
        return this.getStatus(key, true, { message: "Database connection is established" });
      }

      throw new HealthCheckError("PostgreSQL failed", this.getStatus(key, false, { message: "Database connection is not established" }));
    } catch (error) {
      throw new HealthCheckError("PostgreSQL failed", this.getStatus(key, false, { message: error.message }));
    }
  }
}
